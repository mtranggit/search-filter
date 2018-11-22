import React, {Component} from 'react'
import SearchService from './SearchService'
import ReactJson from 'react-json-view'

class Search extends Component {
  state = {
    value: '',
    results: [],
  }

  searchService = new SearchService()

  componentDidMount = () => {
    this.searchService.getResults().subscribe(response => {
      if (response && response.length) {
        this.setState({results: response})
      }
    })
  }

  handleSearch = e => {
    this.searchService.search({
      value: e.target.value.trim(),
    })
  }

  componentWillUnMount = () => this.searchService.unsubscribe()

  render() {
    const {results} = this.state
    return (
      <div className="form-group">
        <h4>Search</h4>
        <input
          type="text"
          className="form-control"
          placeholder="Search Term"
          onChange={this.handleSearch}
        />
        {results && results.length && <SearchResult results={results} />}
      </div>
    )
  }
}

const SearchResult = props => {
  const results = props.results.map(result => (
    <li className="list-group-item" key={result.name}>
      <a href={result.homeworld}>{result.name}</a>
    </li>
  ))
  return <ul className="list-group">{results} </ul>
}

export default Search
