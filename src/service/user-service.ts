import { UserRepository } from '../dao/repository';
import { User } from '../model/user.model';
import { IdType } from '../shared/shared-types';


class UserService {
    private repo = new UserRepository();

    async getAllUsers() {
        const resp = await fetch('http://localhost:9000/api/users');
        const users = await resp.json();
        return users;
    }

    async getUserById(userId: IdType) {
        const resp = await fetch(`http://localhost:9000/api/users/${userId}`);
        const user = await resp.json();
        return user;
    }

    async createNewUser(user: User) {
        const resp = await fetch('http://localhost:9000/api/users', {
            method: 'POST',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        const created = await resp.json();
        return created;
    }

    async updateUser(user: User) {
        const resp = await fetch(`http://localhost:9000/api/users/${user._id}`, {
            method: 'PUT',
            mode: 'cors',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(user),
        });
        const updated = await resp.json();
        return updated;
    }

    async deleteUser(userId: IdType) {
        const resp = await fetch(`http://localhost:9000/api/users/${userId}`, {
            method: 'DELETE',
            mode: 'cors'
        });
        const deleted = await resp.json();
        return deleted;
    }

 
    // async loadPosts(searchTerms: string[]): Promise<Post[]> {
    //     console.log(searchTerms);
    //     const searchText = searchTerms.join(' ');
    //     const result = await fetch(GOOGLE_BOOKS_API + encodeURIComponent(searchText));
    //     const postsFound = await result.json() as RootObject;
    //     // console.log(postsFound);
    //     return postsFound.items.map(item => new Post(
    //         item.id,
    //         item.volumeInfo.title, 
    //         item.volumeInfo.authors,
    //         item.volumeInfo.imageLinks?.thumbnail,
    //         item.volumeInfo.subtitle,
    //         item.volumeInfo.categories,
    //         searchTerms,
    //         item.volumeInfo.description
    //     ));
    // }
}

export default new UserService();

