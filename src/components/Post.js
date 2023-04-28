import { Description, VerifiedRounded } from '@mui/icons-material';
import { forwardRef } from 'react';

const Post = forwardRef(({
    displayName,
    verified,
    timestamp,
    text,
    image,
}, ref) => 
{
    
    return(
        <div className="">
       
        <div className="max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-4 md:p-6">
              <h1 className="text-gray-800 font-bold text-2xl mb-2">{displayName}</h1>
              <p className="text-gray-700 text-base mb-4">
               {text}
              </p>
              <div>
                <span className="inline-block bg-gray-200 rounded-full  px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{image}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Condition Level</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Condition Level</span>
              </div>
            </div>
            <div className="p-4 md:p-6 flex justify-center items-center">
             {/* className="w-full h-auto max-w-sm rounded-md shadow-md" /> */}
             
        <div class="relative inline-flex items-center justify-center  w-36 h-36  overflow-hidden bg-green-300 rounded-full dark:bg-gray-600">
        <span class="font-large text-gray-600  dark:text-green-300">{displayName.charAt(0)}</span>
        </div>
        
            </div>
          </div>
        </div>
        </div>
    )
});

export default Post;





