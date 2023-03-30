import React from 'react';
import './App.css'

function RepoCard({ repo }) {
  
  return (
    <div className='card'>
      <img className='img' src={repo.avatar} alt='avatar'></img>
      <h3>Name: {repo.name}</h3>
      <p> <b>Stars: </b>{repo.stars}</p>
      <p><b>Repo:</b> {repo.description}</p>
      <p><b>Language:</b> {repo.language}</p>
      <a href={repo.url} target='_blank' rel="noopener noreferrer" >View on GitHub</a>
      <hr/>
    </div>
  );
}

export default RepoCard;

