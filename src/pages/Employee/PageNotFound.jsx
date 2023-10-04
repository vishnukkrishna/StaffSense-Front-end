import React from 'react'
import page from "../../images/404-error.jpg";

function PageNotFound() {
    return (
        <>
            <div className="h-screen w-screen bg-gray-100 flex items-center">
                <div className="container flex flex-col md:flex-row items-center justify-center px-5 text-gray-700 mx-auto w-full h-full">
                    <div className="max-w-md text-center md:text-left md:pr-8">
                        <div className="text-5xl font-dark font-extrabold">404</div>
                        <p className="text-2xl md:text-3xl font-light leading-normal">
                            Sorry, we couldn't find this page.
                        </p>
                        <p className="mb-8 mt-2">
                            But don't worry, you can find plenty of other things on our homepage.
                        </p>
                        <a href="/">
                            <button className="px-4 py-2 text-sm font-semibold leading-5 shadow text-white transition-colors duration-150 border border-transparent rounded-lg focus:outline-none focus:shadow-outline-blue bg-customColor active:bg-blue-600 hover:bg-blue-700">
                                Back to Homepage
                            </button>
                        </a>
                    </div>
                    <div className="max-w-lg">
                        <img
                            src={page}
                            alt="Error 404 Illustration"
                            className="rounded-2xl shadow-md w-full md:w-auto h-auto md:h-96"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageNotFound