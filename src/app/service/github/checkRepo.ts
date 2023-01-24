import fetch from 'node-fetch';

export async function getinfo(username) {
    await fetch('https://api.github.com/repos/{username}/White-Rabbi')
      .then((res) => res.json())
      .then((result:any) => {
        return result.fork
      }, (error) => {
        console.log(error);
      });
  }
  

