/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var USERS_FILE = path.join(__dirname, 'users.json');

app.set('port', (process.env.PORT || 9000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.setHeader(`Access-Control-Allow-Methods`, `GET, POST, PUT, DELETE, OPTIONS`);
    res.setHeader('Access-Control-Max-Age', 3600 ); // 1 hour
    // Disable caching so we'll always get the latest posts.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.get('/api/users/:id', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let users = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    const userId = req.params.id;
    const index = users.findIndex(c => c.id === userId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `User with ID=${userId} not found.`});
      return;
    }
    const found = users[index];
    res.json(found); //200 OK with deleted post in the body
  });
});


app.post('/api/users', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    const users = JSON.parse(data);
    const newUser = req.body;
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    newUser.id = Date.now() + '';
    users.push(newUser);
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.status(201).location(`/api/users/${newUser.id}`).json(newUser);
    });
  });
});

app.put('/api/users/:id', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var users = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    const userId = req.params.id;
    const user = req.body;
    if(userId !== user.id) {
      res.status(400).json({code: 400, message: `IDs in the URL and message body are different.`});
      return;
    }
    const index = users.findIndex(c => c.id === userId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `User with ID=${userId} not found.`});
      return;
    }
    users[index] = user;
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(user); //200 OK with post in the body
    });
  });
});

app.delete('/api/users/:id', function(req, res) {
  fs.readFile(USERS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    let users = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    const userId = req.params.id;
    const index = users.findIndex(c => c.id === userId);
    if(index < 0) {
      res.status(404).json({code: 404, message: `User with ID=${userId} not found.`});
      return;
    }
    const deleted = users[index]
    users.splice(index, 1);
    fs.writeFile(USERS_FILE, JSON.stringify(users, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(deleted); //200 OK with deleted post in the body
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
