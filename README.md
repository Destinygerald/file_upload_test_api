# LibHub Book/Collection Service

## About
This Service is responsible for providing available books & book collections as well as handling books uploading and downloading, 

**Services Features include**
- List of Books
- List of Collections
- Book Info
- Book Download
- Collections Info(List of books in that collection)

## Services Endpoint

#### Books Endpoint
- GET */books?page* : It will return a list of available published books (check the model for published books). P.S It will be paginated 
	Response:
```json
	{
		"status": "Success",
		"results": {
			"length": 80,
			"page": 1,
			"pageCount": 6,
		}, 
		"data": [
			// Info of books
		]
	}
```

	

- POST */books/new-book* : creates and upload a new book
	Request Body
		- title
		- description
		- category
		- image *Optional*


- POST */books/new-book/drafted* : creates a new book but doesn't upload it
	Request Body
		- title
		- description
		- category
		- image *Optional*


- PUT */books/book/:id*: Update a book info (Authentication required)
	Request Body *All of which is optional*
		- title
		- description
		- category
		- image		

- PUT */books/book/unpublish/:id*: Unpublishes a book (doesn't delete it, just takes it off public view)   (Authentication required)

- GET */books/book/:id* : returns info on a book with the specified id
	Response: 
``` json
		{
			"status": "Success",
			"results": {
				"Similar_Books": [] // some books in same category as this one
			},
			"data": {
				// info on the book
			}
		}
```

- GET */books/search?book* : return list of books that have similar title as the query parameter. Make us of regex for the search to return books with title that are likely similar to the query parameter
	Response:
```json
	{
		"status": "Success",
		"results": {
			"length": 8
		},
		"data": [
			// List of books
		]
	}
```


#### Collections Endpoint
- GET */collections?page* : returns list of available collections
	Response:
```json
	{
		"status": "Success",
		"results": {
			"length": 60,
			"page": 1,
			"pageCount": 10
		},
		"data": []
	}
```

- GET */collections/collection/:id?page*: returns list of books in a collection
	Response:
```json
	{
		"status": "Success",
		"results": {
			"length": 30,
			"page": 1,
			"pageCount": 2
		},
		"data": []
	}
```

- POST */collections/new*: creates and uploads a new collection of books
	Request body:
	- name *The collection name*
	- author
	- books *Array of book ids*


- POST */collections/new/drafted*: creates a new collection of books but doesn't upload it, it is just added to the users drafts
	Request body:
	- name *The collection name*
	- author
	- books *Array of book ids*


- PUT */collections/collection/:id*: updates a collection list (Authentication reqiured)
	Request body:
	- action: 'Remove or add'
	- bookId

- PUT */collections/collection/unpublish/:id*: Unpublishes a collection (doesn't delete it, just takes it off public view)  (Authentication required)

- DELETE */collections/collection/:id* : deletes a collection (Authentication required)


#### Drafts Endpoint
- GET */drafts/books*: returns list of unpublished books by the user (Authentication required)
	Response
```json
	{
		"status": "Success",
		"data": []
	}
```

- GET */drafts/collections*: returns list of unpublished collections by the user (Authentication required)
	Response
```json
	{
		"status": "Success",
		"data": []
	}
```

- GET */drafts/book/:id*: returns info on an unpublished book (Authentication required)
	Response
```json
	{
		"status": "Success",
		"data": {

		}
	}
```

- GET */drafts/collection/:id*: returns info on an unpublished collection (Authentication required)
	Response
```json
	{
		"status": "Success",
		"data": []
	}
```

- PUT */drafts/book/publish/:id*: publishes a book (Authentication required)

- PUT */drafts/collection/publish/:id*: publishes a collection (Authentication required)

- DELETE */drafts/book/:id*: publishes a book (Authentication required)

- DELETE */drafts/collection/:id*: publishes a collection (Authentication required)