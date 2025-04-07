import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <div className="bg-[url(./assets/background.avif)] bg-center bg-cover  h-screen w-full  relative linear-gradient(toright , #04091eb3 , #04091eb3 )" >

                <div className='bg-gray-50 w-full absolute flex justify-between'>
                    <img src="./src/assets/icon.png" alt="Logo Image" className='w-30 h-15 ml-0.5' />
                    <Link to='/signup' className=' mr-6 mt-2 border rounded-md cursor-pointer  bg-green-500 hover:bg-green-700 rounded  transition-all px-3 mb-2 py-2 font-medium text-gray-800'>Sign Up</Link>
                </div>
                <div className=' bottom-0 h-20 w-full absolute  flex items-center justify-center flex-col bg-amber-50' >
                    <h2 className=' text-2xl text-gray-900 font-bold mt-1'> Getting Started With <span className='text-green-500'>RideSnap!</span></h2>
                    <Link to='/login' hrefLang='<Login/>' className='mt-2 border rounded-md cursor-pointer  bg-green-500 hover:bg-green-700 rounded  transition-all px-4 mb-2 py-1 font-medium text-gray-800'> Continue</Link>
                </div>
            </div>
        </div>
    )
}

export default Home
