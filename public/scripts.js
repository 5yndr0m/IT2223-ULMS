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

});