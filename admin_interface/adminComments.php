<?php

include_once "../page_parts/admins/adminHeader.php";
include_once "../routers/clientRouter.php";

?>

<!-- Comments data -->

<!-- Table Comments -->
<div class="relative overflow-x-auto shadow-md sm:rounded-lg w-10/12 mx-auto mb-10 bg-gray-100 mt-24 border" id="divTable">
    <div class="flex justify-between">
        <p class="m-3 text-3xl">Comments</p>

        <!-- Filter comment status -->
        <div class="mx-6 my-2 flex">
            <label for="selectStatus" class="w-40 my-auto">Select status</label>
            <select type="text" name="selectStatus" id="selectStatus" class="w-30 bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                <option value="4" selected class="text-gray-400">ALL</option>
            </select>
        </div>

    </div>

    <!-- Table data -->
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="px-3 py-3 w-20 text-center">
                        Actions
                    </th>
                    <th scope="col" class="px-3 py-3 w-20 text-center">
                        Comment status
                    </th>
                    <th scope="col" class="px-3 py-3 w-20 text-center">
                        Comment ID
                    </th>
                    <th scope="col" class="px-3 py-3 w-20 text-center">
                        User ID
                    </th>
                    <th scope="col" class="px-3 py-3">
                        User
                    </th>
                    <th scope="col" class="px-3 py-3">
                        Book
                    </th>                    
                    <th scope="col" class="px-3 py-3">
                        Comment
                    </th>
                </tr>
            </thead>
            <tbody id="tableBody">
            </tbody>
        </table>

    <!-- Book pagination -->
    <div class="pageNumbers text-center py-3 grid grid-cols-3">
        <div>
        </div>
        <div>
        <ul class="inline-flex items-center" id="pageNumbers">
        </ul>
        </div>
        <div class="ml-auto mr-0 px-6 text-gray-600 flex items-center h-full">
            <p id="showPageNo"></p>
        </div>
    </div>

</div>


<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
<script type="module" src="adminComments.js"></script>

<?php

include_once "../page_parts/footer.php";

?>