import {
  testFunction,
  createPagination,
} from "./common_items/commonFunctions.js";

$(function () {
  // Endpoint URLs
  let urlData = "./data_endpoints_clients/booksInfo.php";
  let urlAuthors = "./data_endpoints_admins/dataAuthors.php";
  let urlCategories = "./data_endpoints_admins/dataCategories.php";

  // admin item elements
  let bookImageUrl = $("#bookImageUrl");
  let bookTitle = $("#bookTitle");
  let author = $("#author");
  let bookCategory = $("#bookCategory");
  let publicationYear = $("#publicationYear");
  let numberOfPages = $("#numberOfPages");
  let bookComments = $("#bookComments");
  let comment = $("#comment");
  let btnSubmitComment = $("#btnSubmitComment");
  let msgWhenCommentSubmitted = $("#msgWhenCommentSubmitted");
  let userId = $("#user_id");
  let pendingComment = $("#pendingComment");
  let pendingCommentUser = $("#pendingCommentUser");
  let btnDeleteComment = $(".btnDeleteComment");
  let btnEditComment = $("#btnEditComment");
  let editedComment = $("#editedComment");
  let modal = $("#modal");
  let modalQuestion = $("#modalQuestion");
  let modalBtn = $(".modalBtn");
  let closeModal = $(".closeModal");
  let backdrop = $("#backdrop");
  let leaveACommentDiv = $("#leaveACommentDiv");
  let bookNotesDiv = $("#bookNotesDiv");
  let createNoteDiv = $("#createNoteDiv");
  let note = $("#note");
  let btnSubmitNote = $("#btnSubmitNote");

  btnDeleteComment.click(function () {
    console.log("CLICK");
  });

  // Get book
  let getBook = {
    action: "getBook",
    book_id: location.hash.slice(1),
  };

  $.ajax({
    url: urlData,
    type: "GET",
    data: getBook,
    success: function (itemsData) {
      bookImageUrl.attr("src", itemsData.data[0].book_image);
      bookTitle.text(itemsData.data[0].book_title);
      author.text(
        "by " +
          itemsData.data[0].author_name +
          " " +
          itemsData.data[0].author_surname
      );
      bookCategory.text(itemsData.data[0].category);
      publicationYear.text("published: " + itemsData.data[0].publication_year);
      numberOfPages.text("number of pages: " + itemsData.data[0].no_of_pages);
    },
    error: function (error) {
      console.log("Error: " + JSON.stringify(error));
    },
  });

  // Get pending user comment
  let getPendingComment = {
    action: "getPendingComment",
    book_id: location.hash.slice(1),
    user_id: userId.val(),
  };

  $.ajax({
    url: urlData,
    type: "GET",
    data: getPendingComment,
    success: function (itemsData) {
      if (itemsData.data.comment_status == 1) {
        pendingComment.addClass("hidden");
        leaveACommentDiv.addClass("hidden");
      } else if (itemsData.data.comment_status == 2) {
        pendingComment.addClass("hidden");
        leaveACommentDiv.addClass("hidden");
      } else if (itemsData.data.comment_status == 3) {
        pendingCommentUser.text(
          itemsData.data.name + " " + itemsData.data.surname
        );
        editedComment.text(itemsData.data.comment);
        leaveACommentDiv.addClass("hidden");
      } else if ((itemsData.data.comment_status = "none")) {
        pendingComment.addClass("hidden");
      }
    },
    error: function (error) {
      console.log("Error: " + JSON.stringify(error));
    },
  });

  // Get book comments
  let getComments = {
    action: "getComments",
    book_id: location.hash.slice(1),
    user_id: userId.val(),
  };

  $.ajax({
    url: urlData,
    type: "GET",
    data: getComments,
    success: function (itemsData) {
      if(itemsData.data.length == 0){
        bookComments.addClass("hidden");
      } else {
      itemsData.data.forEach((element) => {

        
        
        if (element.user_id == userId.val()) {
          let comment = `<div class="mb-6 commentDiv">
                            <div class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${
                            element.name + " " + element.surname
                            } commented:</p>
                            <p class="block mb-2 text-sm font-small text-gray-900 dark:text-white">${
                            element.comment
                            }</p>
                            <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">*Your comment about the book</p>
                            </div>
                            <a type="button" class="text-gray-500 hover:text-gray-700 btnDeleteComment"><i class="fa-solid fa-trash-can fa-lg my-5 mr-3"></i></a>
                          </div>`;
                          bookComments.append(comment);
        } else {
          let comment = `<div class="mb-6 commentDiv">
          <div class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <p class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">${
          element.name + " " + element.surname
          } commented:</p>
          <p class="block mb-2 text-sm font-small text-gray-900 dark:text-white">${
          element.comment
          }</p>
        </div>`;
        bookComments.append(comment);
        }

      });
    }
    },
    error: function (error) {
      console.log("Error: " + JSON.stringify(error));
    },
  });

  // Submit comment
  btnSubmitComment.click(function (e) {
    new swal({
      text: "Are you sure you want to submit?",
      icon: "warning",
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#5ea91d",
      showCancelButton: true,
    }).then(function (result) {
      if (result.value) {
        new swal({
          text: "Item has been submited!",
          icon: "success",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        });

        let submitComment = {
          action: "submitComment",
          book_id: location.hash.slice(1),
          user_id: userId.val(),
          comment: comment.val(),
        };

        $.ajax({
          url: urlData,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(submitComment),
          success: function (success) {},
          error: function (error) {
            console.log("Error: " + JSON.stringify(error));
          },
        });
        window.setTimeout(function () {
          location.reload();
        }, 1500);
      } else {
        console.log("button B pressed");
      }
    });
  });

  // Edit comment in database
  btnEditComment.click(function () {
    new swal({
      text: "Are you sure you want to edit this item?",
      icon: "warning",
      confirmButtonText: "Edit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#5ea91d",
      showCancelButton: true,
    }).then(function (result) {
      if (result.value) {
        new swal({
          text: "Item has been edited!",
          icon: "success",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        });

        let editItem = {
          action: "editUserComment",
          book_id: location.hash.slice(1),
          user_id: userId.val(),
          comment: $("#editedComment").val(),
          comment_status: "3",
        };

        $.ajax({
          url: urlData,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(editItem),
          success: function (succsess) {},
          error: function (error) {
            console.log("Error: " + JSON.stringify(error));
          },
        });
      } else {
        console.log("button B pressed");
      }
    });
  });

  // Delete comment in database
  $("body").on("click", ".btnDeleteComment", (e) => {
    new swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DD6B55",
      showCancelButton: true,
    }).then(function (result) {
      if (result.value) {
        new swal({
          text: "Item has been deleted!",
          icon: "success",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        });

        let deleteItem = {
          action: "deleteUserComment",
          book_id: location.hash.slice(1),
          user_id: userId.val(),
        };

        $.ajax({
          url: urlData,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(deleteItem),
          success: function (success) {},
          error: function (error) {
            console.log("Error: " + JSON.stringify(error));
          },
        });

        window.setTimeout(function () {
          location.reload();
        }, 1500);
      } else {
        console.log("button B pressed");
      }
    });
  });

  // Get book notes
  let getNotes = {
    action: "getNotes",
    book_id: location.hash.slice(1),
    user_id: userId.val(),
  };

  $.ajax({
    url: urlData,
    type: "GET",
    data: getNotes,
    success: function (itemsData) {
      if (itemsData.data.length === 0) {
        bookNotesDiv.addClass("hidden");
      } else {
        itemsData.data.forEach((element) => {
          let note = `
          <div class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 my-4">
          <textarea class="existingNote w-full">${element.note}</textarea>
          <a type="button" class="text-gray-500 hover:text-gray-700 btnEditNote"><i class="fa-solid fa-pen-to-square fa-lg my-5 mr-3"></i></a>
            <a type="button" class="text-gray-500 hover:text-gray-700 btnDeleteNote"><i class="fa-solid fa-trash-can fa-lg my-5 mr-3"></i></a>
  </div>`;

          bookNotesDiv.append(note);
        });
        if (itemsData.data.length === 5) {
          createNoteDiv.addClass("hidden");
        }
      }
    },
    error: function (error) {
      console.log("Error: " + JSON.stringify(error));
    },
  });

  // Submit note
  btnSubmitNote.click(function (e) {
    new swal({
      text: "Are you sure you want to submit?",
      icon: "warning",
      confirmButtonText: "Submit",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#5ea91d",
      showCancelButton: true,
    }).then(function (result) {
      if (result.value) {
        new swal({
          text: "Item has been submited!",
          icon: "success",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        });

      let submitNote = {
        action: "submitNote",
        book_id: location.hash.slice(1),
        user_id: userId.val(),
        note: note.val(),
      };

      $.ajax({
        url: urlData,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(submitNote),
        success: function (success) {},
        error: function (error) {
          console.log("Error: " + JSON.stringify(error));
        },
      });
    window.setTimeout(function () {
          location.reload();
        }, 1500);
      } else {
        console.log("button B pressed");
      }
    });
  });

    // Edit note in database
    $("body").on("click", ".btnEditNote", (event) => {
      event.preventDefault()
      new swal({
        text: "Are you sure you want to edit this item?",
        icon: "warning",
        confirmButtonText: "Edit",
        cancelButtonText: "Cancel",
        confirmButtonColor: "#5ea91d",
        showCancelButton: true,
      }).then(function (result) {
        if (result.value) {
          new swal({
            text: "Item has been edited!",
            icon: "success",
            timer: 1500,
            showCancelButton: false,
            showConfirmButton: false,
          });
  
          let editItem = {
            action: "editUserNote",
            book_id: location.hash.slice(1),
            user_id: userId.val(),
            new_note: event.currentTarget.previousSibling.previousSibling.value,
            old_note: event.currentTarget.previousSibling.previousSibling.textContent,
          };
  
          $.ajax({
            url: urlData,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(editItem),
            success: function (succsess) {},
            error: function (error) {
              console.log("Error: " + JSON.stringify(error));
            },
          });
        } else {
          console.log("button B pressed");
        }
      });
    });
  

  // Delete note in database
  $("body").on("click", ".btnDeleteNote", (event) => {
    new swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this item!",
      icon: "warning",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#DD6B55",
      showCancelButton: true,
    }).then(function (result) {
      if (result.value) {
        new swal({
          text: "Item has been deleted!",
          icon: "success",
          timer: 1500,
          showCancelButton: false,
          showConfirmButton: false,
        });

        let deleteItem = {
          action: "deleteUserNote",
          book_id: location.hash.slice(1),
          user_id: userId.val(),
          note: event.currentTarget.previousSibling.previousSibling.previousSibling.previousSibling.textContent,
        };

        $.ajax({
          url: urlData,
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify(deleteItem),
          success: function (success) {},
          error: function (error) {
            console.log("Error: " + JSON.stringify(error));
          },
        });

        window.setTimeout(function () {
          location.reload();
        }, 1500);
      } else {
        console.log("button B pressed");
      }
    });
  });
});
