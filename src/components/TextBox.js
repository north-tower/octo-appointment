import { useState, useEffect } from 'react';
import { auth, db, storage} from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage"
import Navbar from './Navbar';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

function TextBox(){
    const [ textMessage,setTextMessage ] = useState("");
    const [ textImage, setTextImage] = useState("");
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    const navigate = useNavigate();
    const date = new Date(timestamp);
    const [user, loading, error] = useAuthState(auth);
    const [userName, setUserName] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    
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
            url:startDate,
            text:textMessage,
            timestamp:dateFormat,

        });
        setTextMessage("");
    setTextImage("");
    navigate('/success')
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
            url :" downloadURL",
            text : textMessage,
            timestamp:dateFormat
          }
        )

      })
    })
  }
    return (
      <>
      <Navbar />
      <section class="bg-gray-50 h-screen dark:bg-gray-900">
        <div class="max-w-xl h- mx-auto bg-white shadow-lg rounded-lg  my-8">
          
            <div  class="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Book Appointment
              </h1>
            
              <form class="space-y-4 md:space-y-6" name='upload_file' onSubmit={sendPost}>
                {/* <div>
                  <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload file</label>
                  <input type='file' class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" />
                </div> */}
                <div class="mb-6">
                  <label for="large-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                  <input type='text' value={textMessage} onChange={(e) => setTextMessage(e.target.value)}
                  class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 
                  focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                </div>
                
<div class="relative max-w-sm">
  
  <label for="formFile" class="form-label inline-block mb-2 text-gray-700"
            >Date of the Appointment</label>
 <DatePicker
  selected={startDate}
  onChange={(date) => setStartDate(date)} style={{   zindex: 9999  }}
  className="block w-full mt-1 py-2 px-3 border z-10 border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
/>

</div>

                <button type='submit'  class="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full mt-4 py-2 px-4 border border-blue-700 rounded">Book</button>
               </form>
    </div>
        </div>   
    
    </section>
    </>
    )
}

export default TextBox;