$(function () {
    // Endpoint URL
    let urlData = "dataAuthors.php";
  
    // admin Authors elements
    let divMain = $("#divMain");
    let divMainBackdrop = $("#divMain-backdrop");
    let authorName = $("#authorName");
    let authorSurname = $("#authorSurname");
    let authorCV = $("#authorCV");
    let msgForm = $("#msgForm");
    let btnSubmitForm = $("#btnSubmitForm");
    let btnSubmitEditedItem = $("#btnSubmitEditedItem");
    let btnAddItem = $("#btnAddItem");
    let btnCloseForm = $(".btnCloseForm");
    let tableBody = $("#tableBody");
    let paginationNumbers = $("#paginationNumbers");
    let showPageNo = $("#showPageNo");
    let deleteModal = $("#deleteModal");
    let deleteModalBtn = $(".deleteModalBtn");
    let closeDeleteModal = $(".closeDeleteModal");
  
    let showItemContent = function () {
      // AJAX GET data from endpoint
      let getItem = {
        page: location.hash.slice(6),
      };
      let url = "";
      if (location.hash === "") {
        url = urlData;
      } else {
        url = urlData + "?page=" + getItem["page"];
      }
  
      $.ajax({
        url: url,
        type: "GET",
        contentType: "application/json",
        data: JSON.stringify(getItem),
        success: function (data) {
  
          // Setup Pagination Buttons
          function createPagination(wrapper, totalPages, page) {
            let active;
            wrapper.empty()
            if (page > 1) {
              let firstPageBtn = $(`<button  value="1" class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">First
              </button>`);
              firstPageBtn.click(function () {
                let pageNumber = location.hash.slice(6);
                pageNumber = 1;
                let urlHash = "Page_" + pageNumber;
                location.hash = urlHash;
                tableBody.empty();
                showItemContent();
              });
              wrapper.append(firstPageBtn);
            }
  
            for (let plength = parseFloat(page)-1; plength <= parseFloat(page)+1; plength++) {
              if (plength > totalPages) {
                continue;
              }
              if (plength == 0) {
                plength = plength + 1;
              }
              if (page == plength) {
                active = "text-blue-500";
              } else {
                active = "";
              }
              let button = $(`<button value="${plength}" class="px-4 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${active}">${plength}</button>`);
              button.click(function () {
                let urlHash = "Page_" + button.val();
                location.hash = urlHash;
                tableBody.empty();
                showItemContent();
              });
              wrapper.append(button);
            }
  
            if (page < totalPages) {
              let nextBtn = $(`<button value="${totalPages}" class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Last</button>`);
              wrapper.append(nextBtn);
              nextBtn.click(function () {
                  let pageNumber = location.hash.slice(6);
                  pageNumber = parseFloat(pageNumber)
                  pageNumber = totalPages;
                  let urlHash = "Page_" + pageNumber;
                  location.hash = urlHash;
                  tableBody.empty();
                  showItemContent();
              });
            }
          }
          paginationNumbers.html(
            createPagination(paginationNumbers, data.Total_pages, data.Page)
          );
  
          showPageNo.text(`Page ${data.Page} of ${data.Total_pages}`)
  
          // Inserting item data in table
          data.data.forEach((element) => {
            let tableRow = $(`
                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" id="tableRow${
                      element["author_id"]
                    }">
                    <td class="px-3 py-3 grid content-start">
                    <form method="POST">
                    <input type="hidden" name="action" value="edit">
                      <button type="submit" class="w-20 text-white bg-green-700/80 hover:bg-green-600/80 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded text-xs px-2 py-1 my-1 text-center dark:bg-green-900 dark:hover:bg-green-800 dark:focus:ring-green-800" id="btnEditItem${
                        element["author_id"]
                      }">Edit</button>
                      </form>
                      <form method="POST">
                      <input type="hidden" name="action" value="delete">
                      <button data-modal-target="deleteModal" data-modal-toggle="defaultModal" type="button" class="w-20 text-white bg-red-500/90 hover:bg-red-400 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded text-xs px-2 py-1 text-center dark:bg-red-900 dark:hover:bg-red-800 dark:focus:ring-red-800 "id="btnDeleteItem${
                        element["author_id"]
                      }">Delete</button>
                    </form>
                    </td>
                    <td class="px-3 py-3 text-xs h-full align-text-top text-center">
                        ${element["author_status"]}
                    </td>
                    <td class="px-3 py-3 align-text-top text-right">
                        ${element["author_id"]}
                    </td>
                    <th scope="row" class="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white align-text-top">
                    ${element["author_name"]}
                    </th>
                    <td scope="row" class="px-3 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white align-text-top">
                        ${element["author_surname"]}
                    </td>
                    <td class="px-3 py-3 text-left">
                        ${element["author_CV"]}
                    </td>
                </tr>`);
  
            tableBody.append(tableRow);
            if (element["author_status"] === "DELETED") {
              $(`#btnDeleteItem${element["author_id"]}`).addClass("hidden");
              $(`#btnEditItem${element["author_id"]}`).text("Activate");
              // btnSubmitEditedItem.text("Activate book")
              $(`#tableRow${element["author_id"]}`).addClass("bg-red-50");
            }
  
            // Soft delete item in database
            $(`#btnDeleteItem${element["author_id"]}`).click(function () {
              divMainBackdrop.fadeIn(100)
              deleteModal.fadeIn(100)
              deleteModalBtn.attr("id", `deleteModalBtn${element["author_id"]}`)

              $(`#deleteModalBtn${element["author_id"]}`).click(function () {
              let deleteItem = {
                action: "delete",
                author_status: "DELETED",
                author_id: element["author_id"],
              };
  
              $.ajax({
                url: urlData,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(deleteItem),
                success: function (deleteItem) {},
                error: function (error) {
                  console.log("Error: " + JSON.stringify(error));
                },
              });
              deleteModal.fadeOut(200)
              divMainBackdrop.fadeOut(200)
              window.setTimeout(function(){location.reload()},200)
              })
              closeDeleteModal.click(function(){
                deleteModal.fadeOut(200)
                divMainBackdrop.fadeOut(200)
              })
            });
  
            // Edit item in database
            $(`#btnEditItem${element["author_id"]}`).click(function (e) {
              e.preventDefault();

              authorName.val(element["author_name"]);
              authorSurname.val(element["author_surname"]);
              authorCV.val(element["author_CV"]);
  
              divMainBackdrop.fadeIn(150);
              divMain.fadeIn(150);
              btnSubmitForm.addClass("hidden");
              btnSubmitEditedItem.removeClass("hidden");
  
              btnSubmitEditedItem.click(function () {
                let editItem = {
                  action: "edit",
                  author_status: "ACTIVE",
                  author_id: element["author_id"],
                  author_name: authorName.val(),
                  author_surname: authorSurname.val(),
                  author_CV: authorCV.val(),
                };
  
                $.ajax({
                  url: urlData,
                  type: "POST",
                  contentType: "application/json",
                  data: JSON.stringify(editItem),
                  success: function (editItem) {},
                  error: function (error) {
                    console.log("Error: " + JSON.stringify(error));
                  },
                });
                location.reload();
              });
            });
          });
        },
        error: function (error) {
          console.log("Error: " + JSON.stringify(error));
        },
      });
    };
  
    // on load show content in table
    $(document).ready(showItemContent);
  
  
    // Submit new item to database
    btnSubmitForm.click(function (e) {
      e.preventDefault();
  
      let submitItem = {
        action: "create",
        author_name: authorName.val(),
        author_surname: authorSurname.val(),
        author_CV: authorCV.val(),
        author_status: "ACTIVE"
      };
  
      let formValidation = function () {
        if (
          authorName.val() === "" ||
          authorSurname.val() === "" ||
          authorCV.val() === ""
        ) {
          msgForm.text("All field are required!");
          msgForm.addClass("text-red-500");
        } else {
          $.ajax({
            url: urlData,
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(submitItem),
            success: function (submitItem) {
              console.log("Successfuly sent AJAX POST request." + submitItem);
            },
            error: function (error) {
              console.log("Error: " + JSON.stringify(error));
            },
          });
          msgForm.text("Author successfuly added!");
          msgForm.addClass("text-green-500");
          window.setTimeout(function(){location.reload()},700)
        }
      };
      formValidation();
    });
  
    btnCloseForm.click(function () {
      divMainBackdrop.fadeOut(150);
      divMain.fadeOut(150);
    });
  
    btnAddItem.click(function () {
      divMainBackdrop.fadeIn(150);
      divMain.fadeIn(150);
      btnSubmitForm.removeClass("hidden");
      btnSubmitEditedItem.addClass("hidden");
    });
  
  });
  