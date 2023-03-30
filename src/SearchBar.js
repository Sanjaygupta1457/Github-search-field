import React, { useState } from 'react';
import RepoCard from './RepoCard';
import './App.css';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [repos, setRepos] = useState([]);
  const [sortBy, setSortBy] = useState('stars');

  const handleSearch = async () => {
    const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}&sort=${sortBy}`);
    const data = await response.json();
    const repos = data.items.map(item => ({
      name: item.name,
      description: item.description,
      language: item.language,
      stars: item.stargazers_count,
      watchers: item.watchers_count,
      score: item.score,
      avatar: item.owner.avatar_url,
      created_at: item.created_at,
      updated_at: item.updated_at,
      url: item.html_url
    }));
    setRepos(repos);
    
  }

  const handleSort = (event) => {
    setSortBy(event.target.value);
  }

  const sortOptions = [
    { value: 'stars', label: 'Stars' },
    { value: 'watchers', label: 'Watchers Count' },
    { value: 'score', label: 'Score' },
    { value: 'name', label: 'Name' },
    { value: 'created', label: 'Created At' },
    { value: 'updated', label: 'Updated At' }
  ];

  const sortFunction = (a, b) => {
    switch (sortBy) {
      case 'stars':
        return b.stars - a.stars;
      case 'watchers':
        return b.watchers - a.watchers;
      case 'score':
        return b.score - a.score;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'created':
        return new Date(b.created_at) - new Date(a.created_at);
      case 'updated':
        return new Date(b.updated_at) - new Date(a.updated_at);
      default:
        }
    }
    return (
      <div className='search'>
         <h4>Search Here for Github!</h4>
      <div className="search-bar">
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="sort">
        <span><b>Sort by: </b></span>
        <select value={sortBy} onChange={handleSort}>
          {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </div>
      <hr/>
      <div className="repo-list">
        {repos.sort(sortFunction).map(repo => <RepoCard key={repo.name} repo={repo} />)}
      </div>
      </div>
    );
  }
 export default SearchBar;