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

                <div className="bg-gray-300 flex sm:flex-row flex-wrap justify-evenly">
                    <div>
                        <h4>Need help?</h4>
                        <a href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox?compose=DmwnWsLPtkNmvlMqVnDjlPPRxjmPzjBJnXlZqFVwPjHtQNJJcsVgxbtxnXfQBwGtGTzpnCWrmxLQ" className="no-underline text-black"><h6 className="flex"><CgMail />Contact us</h6></a>
                    </div>

                    <div>
                        <h4>About us</h4>
                        <a href="https://github.com/" className="no-underline text-black"><h6 className="flex"><AiFillGithub />GitHub</h6></a>
                        <a href="https://www.linkedin.com/feed/" className="no-underline text-black"><h6 className="flex"><AiOutlineLinkedin />Linkedin</h6></a>

                    </div>

                    <div>
                        <h4>Follow us</h4>

                        <a href="" className="no-underline text-black"><h6 className="flex"><AiOutlineFacebook />Facebook</h6></a>
                        <a href="" className="no-underline text-black"><h6 className="flex"><AiOutlineTwitter />Twitter</h6></a>
                        <a href="" className="no-underline text-black"><h6 className="flex"><AiOutlineInstagram />Instagram</h6></a>

                    </div>

                    <div>
                        <h4>My account</h4>
                        <Link to={`/user/${id}`} className="no-underline text-black"><h6 className="flex"><CgProfile />Profile</h6></Link>
                        <Link to={`/wishlist/${id}`} className="no-underline text-black"><h6 className="flex"><MdFavorite />Favorites</h6></Link>
                        <Link to={`/historial/${id}`} className="no-underline text-black"><h6 className="flex"><MdOutlineShoppingBag />Shopps</h6></Link>
                    </div>
                </div>
                <p className="bg-gray-300 text-center">© 2022 by Nombre e-commerce</p>

            </footer>
        </div>

    )
}