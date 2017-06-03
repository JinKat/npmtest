const needle = require("needle");
const Promise = require("bluebird");
Promise.promisifyAll(needle);

function getTopRepoByUser(user) {
    console.log('getTopRepoByUser');
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/users/' + user + '/repos')
            .then((response) => {
                let repoArray = [];
                response.body.every((item, index) => {
                    let repo = {
                        id: item.id,
                        name: item.name,
                        url: item.html_url
                    };
                    repoArray.push(repo);
                    return index != 9;
                });
                resolve(repoArray);
                console.log(repoArray);
            })
    })
}

function findRepoByName(name) {
    console.log('findRepoByName');
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/search/repositories?q=' + name)
            .then((response) => {
                let repoArray = [];
                response.body.items.every((item, index) => {
                    let repo = {
                        id: item.id,
                        name: item.name,
                        owner: item.owner.login,
                        url: item.html_url
                    };
                    repoArray.push(repo);
                    return index != 9;
                });
                resolve(repoArray);
                console.log(repoArray);
            })
    })
}

function getLastCommits(user, repository) {
    console.log('getLastCommits');
    return new Promise((resolve, reject) => {
        needle.getAsync('https://api.github.com/repos/' + user + '/' + repository + '/commits')
            .then((response) => {
                let repoArray = [];
                response.body.every((item, index) => {
                    let repo = {
                        sha: item.sha,
                        author: item.author.login,
                        message: item.commit.message,
                        date: item.commit.committer.date,
                    };
                    repoArray.push(repo);
                    return index != 9;
                });
                resolve(repoArray);
                console.log(repoArray);
            })
    })
}


exports.getTopRepoByUser = getTopRepoByUser;
exports.findRepoByName = findRepoByName;
exports.getLastCommits = getLastCommits;
