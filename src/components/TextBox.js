import { useState, useEffect } from 'react';
import { auth, db, storage} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import Navbar from './Navbar';


function TextBox(){
    const [ textMessage,setTextMessage ] = useState("");
    const [ textImage, setTextImage] = useState("");
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const navigate = useNavigate();
    const date = new Date(timestamp);
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState("");
    
    const fetchUserName = async () => {
        try {
          const q = query(collection(db, "users"), where("uid", "==", user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setUserName(data.name);
        } catch (err) {
          console.error(err);
          alert("An error occured while fetching user data");
        }
      };

      useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
      }, [user, loading]);
    const dateFormat = date.getHours() + ":" + date.getMinutes() + ", " + date.toDateString();
    const sendPost = e => {
        e.preventDefault();

        db.collection('posts').add({
            displayName:userName,
            username:"Tets",
            verified:true,
            url:textImage,
            text:textMessage,
            timestamp:dateFormat,

        });
        setTextMessage("");
    setTextImage("");
    }

    const [urls, setUrls] = useState([]);
  
  
  const handleSubmit = (e) => {
    e.preventDefault()
    const file = e.target[0]?.files[0]
  
    if (!file) return null;
    const storageRef = ref(storage, `files/${file.name}`)
    uploadBytes(storageRef, file)
    .then((snapshot) => {
      e.target[0].value = ''
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        e.preventDefault()

        db.collection('posts').add(
          {
            displayName:userName,
            username:userName,
            verified: true,
            url : downloadURL,
            text : textImage,
            timestamp:dateFormat
          }
        )

      })
    })
  }
    return (
      <>
      <Navbar />
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
           <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div  class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Upload
              </h1>
            <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
            >Choose a photo to upload</label>
              <form class="space-y-4 md:space-y-6" name='upload_file' onSubmit={handleSubmit}>
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                  <input type='file' class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </div>
                <div class="mb-6">
                  <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input type='text' value={textImage} onChange={(e) => setTextImage(e.target.value)}
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                <button type='submit'  onClick={() => navigate(-1)}
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full mt-4 py-2 px-4 border border-blue-700 rounded">Upload</button>
               </form>
    </div>
        </div>   
    </div>
    </section>
    </>
    )
}

export default TextBox;