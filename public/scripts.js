//client side scripting
document.addEventListener('DOMContentLoaded', () => {
    const searchBookForm = document.getElementById('searchBookForm');
    if (searchBookForm) {
        searchBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const searchType = document.getElementById('searchType').value;
            const searchQuery = document.getElementById('searchQuery').value;
            
            fetch(`http://localhost:3000/book/searchBook?type=${searchType}&query=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    searchResultsTable.innerHTML = '';
                    if (data.length > 0) {
                        data.forEach(book => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<td>${book.name}</td><td>${book.author}</td><td>${book.isbn}</td><td>${book.year}</td><td>${book.copies}</td>`;
                            searchResultsTable.appendChild(tr);
                        });
                    } else {
                        searchResultsTable.innerHTML = '<tr><td colspan="5">No matching book found</td></tr>';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element searchBookForm not found');
    }

    const searchBorrowBookForm = document.getElementById('searchBorrowBookForm');
    if (searchBorrowBookForm) {
        searchBorrowBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const searchQuery = document.getElementById('searchBorrowQuery').value;
            console.log(searchQuery);
            fetch(`http://localhost:3000/borrow/searchBook?query=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    // borrowResultsTable.innerHTML = '';
                    if (data.length > 0) {
                        data.forEach(borrow => {
                            const tr = document.createElement('tr');
                            tr.innerHTML = `<td>${borrow.userName}</td><td>${borrow.borrowedDay}</td><td>${borrow.returnDay}</td>`;
                            borrowResultsTable.appendChild(tr);
                        });
                    } else {
                        borrowResultsTable.innerHTML = '<tr><td colspan="5">No matching result found</td></tr>';
                    }
                    const resultsDiv = document.getElementById('searchBorrowBookResults');
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element searchBorrowBookForm not found');
    }

    const allBorrowsForm = document.getElementById('allBorrowsForm');
    if (allBorrowsForm) {
        allBorrowsForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            fetch('http://localhost:3000/borrow')
                .then(response => response.json())
                .then(data => {
                    allBorrowResultsTable.innerHTML = '';
                    // const resultsDiv = document.getElementById('allBorrowsResult');
                    if (data.length > 0) {
                        data.forEach(borrow => {
                            const tr = document.createElement('tr');

                            const formattedDate = new Date(borrow.borrowedDay).toLocaleDateString();
                            const formattedReturnDate = new Date(borrow.returnDay).toLocaleDateString();

                            tr.innerHTML = `<td>${borrow.userId}</td><td>${borrow.userName}</td><td>${borrow.userEmail}</td><td>${borrow.userContact}</td><td>${borrow.bookId}</td><td>${formattedDate}</td><td>${formattedReturnDate}</td><td>${borrow.returned}</td>`;
                            allBorrowResultsTable.appendChild(tr);
                        });
                    } else {
                        allBorrowResultsTable.innerHTML = '<tr><td colspan="5">No matching result found</td></tr>';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element allBorrowResultsForm not found');
    }

    const updateBookForm = document.getElementById('updateBookForm');
    if (updateBookForm) {
        updateBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newBook = {
                name: document.getElementById('updateName').value,
                author: document.getElementById('updateAuthor').value,
                isbn: document.getElementById('updateISBN').value,
                year: parseInt(document.getElementById('updateYear').value),
                copies: parseInt(document.getElementById('updateCopies').value)
            };

            fetch(`http://localhost:3000/book/updateBook/${bookId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('updateBookResult');
                if (data.message) {
                    resultDiv.innerHTML = `<p>${data.message}</p>`;
                } else {
                    resultDiv.innerHTML = `<p>Error: ${data.error.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const resultDiv = document.getElementById('updateBookResult');
                resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            });
        });
    } else {
        console.error('Element updateBookResult not found');
    }

    //Reccomend books
    const reccomendBookForm = document.getElementById('reccomendBookForm');
    if (reccomendBookForm) {
        reccomendBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const reccomendQuery = document.getElementById('reccomendQuery').value;
            //console.log(reccomendQuery);
            fetch(`http://localhost:3000/borrow/${reccomendQuery}`)
                .then(response => response.json())
                .then(data => {
                    const resultsDiv = document.getElementById('reccomendBookResults');
                    resultsDiv.innerHTML = "Books: "
                    if (data.length > 0) {
                        resultsDiv.innerHTML += data.map(borrow => {
                            const isbn = borrow.bookId
                            fetch(`http://localhost:3000/book/${isbn}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.length > 0) {
                                    resultsDiv.innerHTML += data.map(book => {
                                        const genre = book.genre
                                        fetch(`http://localhost:3000/book/genre/${genre}`)
                                        .then(response => response.json())
                                        .then(data => {
                                            if (data.length > 0) {
                                                resultsDiv.innerHTML += data.map(book => `<p> ${book.name} (Genre: ${book.genre})</p>`
                                                ).join('');
                                            } else {
                                                resultsDiv.innerHTML = '<p>No matching book found</p>';
                                            }
                                        })
                                        .catch(error => console.error('Error:', error));
                                    }
                                    ).join('');
                                } else {
                                    resultsDiv.innerHTML = '<p>No matching book found</p>';
                                }
                            })
                            .catch(error => console.error('Error:', error));
                    }).join('');
                    } else {
                        resultsDiv.innerHTML = '<p>No matching book found</p>';
                    }
                })
                .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element searchBorrowBookForm not found');
    }

    //addBook
    const addBookForm = document.getElementById('addBookForm');
    if (addBookForm) {
        addBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const newBook = {
                name: document.getElementById('addName').value,
                author: document.getElementById('addAuthor').value,
                isbn: document.getElementById('addISBN').value,
                genre: document.getElementById('addGenre').value,
                year: parseInt(document.getElementById('addYear').value),
                copies: parseInt(document.getElementById('addCopies').value)
            };
            
            fetch('http://localhost:3000/book/addBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('addBookResult');
                if (data.message) {
                    resultDiv.innerHTML = `<p>${data.message}</p>`;
                } else {
                    resultDiv.innerHTML = `<p>Error: ${data.error.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const resultDiv = document.getElementById('addBookResult');
                resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
            });
        });
    } else {
        console.error('Element addBookForm not found');
    }

    //borrowBook
    const borrowBookForm = document.getElementById('borrowBookForm');
    if (borrowBookForm) {
        borrowBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const borrowDetails = {
                userId: document.getElementById('borrowUserId').value,
                userName: document.getElementById('borrowUserName').value,
                userEmail: document.getElementById('borrowUserEmail').value,
                userContact: document.getElementById('borrowUserContact').value,
                bookId: document.getElementById('borrowBookId').value
            };

            fetch('http://localhost:3000/borrow/borrowBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(borrowDetails),
            })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('borrowBookResult');
                resultDiv.innerHTML = `<p>${data.message}</p>`;
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element borrowBookForm not found');
    }

    //returnBook
    const returnBookForm = document.getElementById('returnBookForm');
    if (returnBookForm) {
        returnBookForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const returnDetails = {
                userId: document.getElementById('returnUserId').value,
                bookId: document.getElementById('returnBookId').value,
            };

            fetch('http://localhost:3000/borrow/returnBook', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(returnDetails),
            })
            .then(response => response.json())
            .then(data => {
                const resultDiv = document.getElementById('returnBookResult');
                resultDiv.innerHTML = `<p>${data.message}</p>`;
            })
            .catch(error => console.error('Error:', error));
        });
    } else {
        console.error('Element returnBookForm not found');
    }

});