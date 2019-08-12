# simple-azure-file-storage-explorer
A lightweight JS and HTML page to access, upload and delete from an Azure File Storage

## How to build
 - `npm install`
 - update the values in the `simpleazurefileexplorer.html` file for your `sasToken` and `serviceGroup` url
   - use [the documentation from MS](https://docs.microsoft.com/en-us/azure/storage/common/storage-dotnet-shared-access-signature-part-1) for more details, in this case we are using the `file` service endpoint.
   - you will _also_ need to allow the source origin in the `Azure Storage Account` -> `CORS` -> `File Service` -> `Allowed Origins` with (at least in my case) all `methods` allowed.
 - `gulp`
   - will execute a `clean` on the `/dist` directory, then compile the `scripts` and minify the html via the `pages` task (see `gulpfile.js`) 

## Screenshots

### Main Files and Folders
![alt text](/assets/fileandfolder.png "Files and Folders")

### Create New Folder
![alt text](/assets/newfolder.png "Create New Folder")

### Upload Files
![alt text](/assets/upload.png "Upload Files")

## Additional information
 - the file uploader itself was a version of [blueimp's jQuery fileuploader](https://blueimp.github.io/jQuery-File-Upload/) with a few very specific overrides to work with `Azure Storage`
 - [azure-sdk-for-js](https://github.com/Azure/azure-sdk-for-js) was used for the main CRUD portions of the module
 - [a SPA branch exists](/github/vandsh/simple-azure-file-storage-explorer/tree/spa) for those who do not want or need full page reloads on clicks
   - the original need for this was a `CRM` integration where the initial values for `sasToken`, `serviceGroup`, `share` and `directory` are fed in thru a `data:{...}` query parameter and then the page was merely updated vs reloaded since `CRM` did not like full page reloads.
   - this branch also features a much more trimmed down styling so it fits more into the form factor of things _like_ `CRM`

### Screenshot of SPA in CRM
![alt text](/assets/incrm.png "In Use within CRM")