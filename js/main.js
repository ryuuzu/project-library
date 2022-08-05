var myLibrary = [];

function bookFactory(title, author, pages, readStatus) {
	this.id = myLibrary.length;
	const getReadStatus = () => {
		return readStatus;
	};
	const changeReadStatus = () => {
		readStatus = !readStatus;
	};
	return { title, author, pages, getReadStatus, changeReadStatus };
}

function updateBookIDS() {
	myLibrary.forEach((book) => {
		book.id = myLibrary.indexOf(book);
	});
}

function getTableHeader() {
	let headerRow = document.createElement("tr");

	let idHead = document.createElement("th");
	idHead.innerHTML = "Book ID";
	headerRow.appendChild(idHead);

	let titleHead = document.createElement("th");
	titleHead.innerHTML = "Book Title";
	headerRow.appendChild(titleHead);

	let authorHead = document.createElement("th");
	authorHead.innerHTML = "Book Author";
	headerRow.appendChild(authorHead);

	let pagesHead = document.createElement("th");
	pagesHead.innerHTML = "Total Pages";
	headerRow.appendChild(pagesHead);

	let readStatusHead = document.createElement("th");
	readStatusHead.innerHTML = "Read Status";
	headerRow.appendChild(readStatusHead);

	let markRead = document.createElement("th");
	markRead.innerHTML = "Change Read Status";
	headerRow.appendChild(markRead);

	let editBook = document.createElement("th");
	editBook.innerHTML = "Edit";
	headerRow.appendChild(editBook);

	return document.createElement("thead").appendChild(headerRow);
}

function getTableBody() {
	let tableBody = document.createElement("tbody");
	for (const libraryBook of myLibrary) {
		let bookRow = document.createElement("tr");
		bookRow.setAttribute("id", libraryBook.id);

		let bookID = document.createElement("td");
		bookID.innerHTML = libraryBook.id;
		bookRow.appendChild(bookID);

		let bookTitle = document.createElement("td");
		bookTitle.innerHTML = libraryBook.title;
		bookRow.appendChild(bookTitle);

		let bookAuthor = document.createElement("td");
		bookAuthor.innerHTML = libraryBook.author;
		bookRow.appendChild(bookAuthor);

		let bookPages = document.createElement("td");
		bookPages.innerHTML = libraryBook.pages;
		bookRow.appendChild(bookPages);

		let bookReadStatus = document.createElement("td");
		bookReadStatus.innerHTML = libraryBook.getReadStatus()
			? "read"
			: "not read";
		bookRow.appendChild(bookReadStatus);

		let bookMarkRead = document.createElement("td");
		let markReadButton = document.createElement("button");
		markReadButton.innerHTML = libraryBook.getReadStatus()
			? "Not Read"
			: "Read";
		markReadButton.addEventListener("click", () => {
			let bookID =
				markReadButton.parentElement.parentElement.getAttribute("id");

			myLibrary.forEach((book) => {
				if (book.id == bookID) {
					book.changeReadStatus();
				}
			});

			updateLibraryTable();
		});
		bookMarkRead.appendChild(markReadButton);
		bookRow.appendChild(bookMarkRead);

		let bookEditButton = document.createElement("td");
		let editButton = document.createElement("button");
		editButton.classList.add("editButton");
		editButton.innerHTML =
			'<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>';
		editButton.addEventListener("click", () => {
			let bookID =
				editButton.parentElement.parentElement.getAttribute("id");
			myLibrary = myLibrary.filter((book) => book.id != bookID);
			updateLibraryTable();
		});
		bookEditButton.appendChild(editButton);
		bookRow.appendChild(bookEditButton);

		tableBody.appendChild(bookRow);
	}
	return tableBody;
}

function updateLibraryTable() {
	updateBookIDS();
	let booksList = document.querySelector(".booksList");
	let oldTable = document.querySelector(".librarytable");
	let newTable = document.createElement("table");
	newTable.classList.add("librarytable");

	newTable.appendChild(getTableHeader());
	newTable.appendChild(getTableBody());

	booksList.removeChild(oldTable);
	booksList.appendChild(newTable);
}

function addBookToLibrary() {
	let title = document.querySelector("#bookName").value;
	let author = document.querySelector("#bookAuthor").value;
	let pages = document.querySelector("#bookPages").value;
	let readStatus = document.querySelector("#read").checked ? true : false;
	myLibrary.push(bookFactory(title, author, pages, readStatus));
	toggleAddForm();
}

document.querySelector("#bookAddButton").addEventListener("click", () => {
	addBookToLibrary();
	updateLibraryTable();
});

myLibrary.push(
	bookFactory(
		"Harry Potter and The Philoshopher's Stone",
		"J.K. Rowling",
		"223",
		true
	)
);
myLibrary.push(bookFactory("The Hobbit", "J. R. R. Tolkien", "304", false));
updateLibraryTable();

let form = document.querySelector(".newBookForm");
let overlay = document.querySelector(".overlay");

function toggleAddForm() {
	form.classList.toggle("visible");
	overlay.classList.toggle("active");
}

document
	.querySelector(".newBookButton")
	.addEventListener("click", toggleAddForm);

document
	.querySelector("#closeAddForm")
	.addEventListener("click", toggleAddForm);
