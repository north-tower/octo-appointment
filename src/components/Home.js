import React from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
  return (
    <div className="">
      <Navbar />
      
<div class="grid grid-cols-2 gap-2 max-w-xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-8">
        <div>
        <a
                    href="#" onClick={()=>navigate('/post')} >
            <img class="h-auto max-w-full rounded-lg" src="https://www.svgrepo.com/show/426104/calendar.svg" alt=""></img>
            </a>
        </div>
        <div>
            <a  href="#" onClick={()=>navigate('/feed')} >
            <img class="h-auto max-w-full rounded-lg" src="https://www.svgrepo.com/show/326228/doctor.svg" alt=""></img>
            </a>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://www.svgrepo.com/show/511200/users-group.svg" alt=""></img>
        </div>
        <div>
            <img class="h-auto max-w-full rounded-lg" src="https://www.svgrepo.com/show/438410/cost-round.svg" alt=""></img>
        </div>
    </div>

    </div>
  );
}

export default Home;
