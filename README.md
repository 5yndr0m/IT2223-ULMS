# University Library Management System

To streamline library management

## Identified Problem and Solution Response

### Identified Problem:

The University of Vavuniya library faces several issues common to many libraries, which
hinder the efficient management and utilization of its book inventory:

- **Misplaced Books:**
Books often end up in the wrong locations, making it difficult for users to find
them and increasing the workload for library staff who need to locate and re-shelve
them correctly.

- **Long Search Times:**
Students and staff spend a considerable amount of time searching for books,
which detracts from their academic pursuits. The absence of a robust search mechanism
exacerbates this problem, especially during busy periods.

- **Manual Processes:**
The library relies on manual systems for cataloging, borrowing, and returning
books. This not only leads to errors and inconsistencies but also consumes a significant
amount of time and effort.

- **Inefficient Resource Utilization:**
Without the ability to track how books are used, the library struggles to allocate
resources effectively, resulting in underutilization or overutilization of certain sections.

### Solution Overview:

To address these issues, we propose a comprehensive University Library Management System
(ULMS) that leverages both traditional algorithms and machine learning techniques. The
system will include features for efficient tracking, quick search capabilities, and personalized
book recommendations.

### Deliverables

The project will deliver the following key features and functionalities:

- **Book Tracking:**
Track the location and status (available, borrowed, reserved, etc.) of each book. Record the history of book movements and checkouts.
- **Search Functionality:**
Provide advanced search options (by title, author, subject, ISBN, etc.). Implement a quick search feature for rapid retrieval of book information.
- **Borrowing and Returning:**
Automate the borrowing and returning processes to reduce manual entry. Notify users of due dates and overdue books.
- **Cataloging:**
Facilitate easy addition, updating, and removal of book records. Support bar-code or RFID tagging for efficient inventory management.
<!-- - **Usage Analytics:**
Track book usage patterns to identify popular books and underutilized sections. Generate reports for resource allocation and planning -->

### Beneficiaries

Direct beneficiaries of the project include:

- **Performance:**
Ensure quick response times for searches and transactions and handle a large volume of data and concurrent users efficiently.
- **Reliability:**
Provide accurate and consistent tracking of book statuses and locations and implement fail-over mechanisms to ensure system availability.
- **Scalability:**
Design the system to support future expansion, including more books and users and enable integration with other university systems.
- **Security:**
Protect sensitive user data and ensure secure access to the system and implement role-based access control to manage permissions.

By providing a comprehensive platform for library management, the project aims to benefit all stakeholders involved in the project delivery within the organization.


## Technologies Used

- **Client:** JavaScript, HTML, CSS
- **Backend:** Node.js, Express, MongoDB

## Setting Up

### Backend

1. Open the folder in the integrated terminal.
2. Type the following command in the terminal and press enter:

   ```
    npm install
    ```
3. Type the following command in the terminal to start the backend:
    ```
    npm start
    ```

### Frontend

1. First start the backend using above instructions.
2. Open the web browser and enter the following address:
    ```
    http://localhost:3000
    ```
3. It will lead to the Homepage of the web portal.

### Usage

1. Index page/ Homepage provides ability to search for a specific book using different search parameters.
2. Add Book page provides ability to add new books to the catelogue with ease.
3. Update Book provide ability to update details of a specific book.
4. With Borrow Book users can borrow a book and Return book can be used to return a book.
5. Borrow logs provide quick access to borrowing history.
6. Recommendation allows users to get recommendation based on their borroeing history.