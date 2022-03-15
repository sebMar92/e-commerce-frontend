import React from "react";
import { Link, useParams } from "react-router-dom";
import { AiFillGithub, AiOutlineLinkedin, AiOutlineFacebook, AiOutlineTwitter, AiOutlineInstagram } from "react-icons/ai";
import { CgMail, CgProfile } from "react-icons/cg"
import { MdFavorite, MdOutlineShoppingBag } from "react-icons/md"


export default function GeneralFooter() {
    const { id } = useParams()

    return (
        <div>
            <footer >

                <div className="bg-gray-300 flex sm:flex-row flex-col flex-wrap justify-evenly p-4 content-center">
                    <div className="m-2">
                        <h3 className="flex">Need help?</h3>
                        <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsLPtkNmvlMqVnDjlPPRxjmPzjBJnXlZqFVwPjHtQNJJcsVgxbtxnXfQBwGtGTzpnCWrmxLQ" className="no-underline text-black"><h5 className="flex m-2"><CgMail />Contact us</h5></a>
                    </div>

                    <div className="m-2">
                        <h3 className="flex">About us</h3>
                        <a href="https://github.com/" className="no-underline text-black"><h5 className="flex m-2"><AiFillGithub />GitHub</h5></a>
                        <a href="https://www.linkedin.com/feed/" className="no-underline text-black"><h6 className="flex m-2"><AiOutlineLinkedin />Linkedin</h6></a>

                    </div>

                    <div className="m-2">
                        <h3 className="flex">Follow us</h3>

                        <a href="" className="no-underline text-black"><h5 className="flex m-2"><AiOutlineFacebook />Facebook</h5></a>
                        <a href="" className="no-underline text-black"><h5 className="flex m-2"><AiOutlineTwitter />Twitter</h5></a>
                        <a href="" className="no-underline text-black"><h5 className="flex m-2"><AiOutlineInstagram />Instagram</h5></a>

                    </div>

                    <div className="m-2">
                        <h3 className="flex">My account</h3>
                        <Link to={`/user/${id}`} className="no-underline text-black"><h5 className="flex m-2"><CgProfile />Profile</h5></Link>
                        <Link to={`/wishlist/${id}`} className="no-underline text-black"><h5 className="flex m-2"><MdFavorite />Favorites</h5></Link>
                        <Link to={`/historial/${id}`} className="no-underline text-black"><h5 className="flex m-2"><MdOutlineShoppingBag />Shopps</h5></Link>
                    </div>
                </div>
                <p className="bg-gray-300 text-center mt-3 p-1">© 2022 by Nombre e-commerce</p>

            </footer>
        </div>

    )
}