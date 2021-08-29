import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader'
 
const Upload = () => {
  // specify upload params and url for your files
  const getUploadParams = ({ meta }) => { return { url: 'http://dbmsocial.s3.us-east-2.amazonaws.com/' } }
  
  // called every time a file's `status` changes
  const handleChangeStatus = ({ meta, file }, status) => { console.log(status, meta, file) }
  
  // receives array of files that are done uploading when submit button is clicked
  const handleSubmit = (files) => { console.log(files.map(f => f.meta)) }
 
  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="image/*,audio/*,video/*"
      multiple="false"
      maxFiles= '1'
    />
  )
}
export default Upload