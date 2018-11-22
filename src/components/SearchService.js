import {Subject, of, from} from 'rxjs'
import {
  delay,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
} from 'rxjs/operators'

class SearchService {
  searchTerm = new Subject()
  searchUrl = 'https://swapi.co/api/people'

  search = term => {
    this.searchTerm.next(term.value)
  }

  doSearch = async term => {
    // const promise = fetch(`${this.searchUrl}/?search=${term}`).then(response =>
    //   response.json(),
    // )
    // return from(promise)
    const response = await fetch(`${this.searchUrl}/?search=${term}`)
    const {results} = await response.json()
    return results
  }

  getResults() {
    const $result = this.searchTerm.pipe(
      delay(500),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(term => (term ? this.doSearch(term) : [])),
      catchError(error => {
        console.log(error)
        return []
      }),
    )
    return $result
  }
}

export default SearchService
