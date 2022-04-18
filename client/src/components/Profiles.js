import NavBar from "./NavBar";
import Footer from "./Footer/Footer";
import Seba from "../components/images/Seba.png";
import Mati from "../components/images/Mati.jpg";
import Pablo from "../components/images/Pablo.jpg";
import Yes from "../components/images/Yes.jpg";
import Feli from "../components/images/Feli.jpg";
import Alejo from "../components/images/Alejo.jpg";
import Fran from "../components/images/Fran.jpg";
import Luciano from "../components/images/Luciano.png";

export default function Profiles() {
  return (
    <div>
      <NavBar />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 text-center m-6">
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Seba</h2>
          <div className="m-2">
            <img
              src={Seba}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/sebastian-martinez-developer/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/sebMar92">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Mati</h2>
          <div className="m-2">
            <img
              src={Mati}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/matiasvaldez1/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/matiasvaldez1">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Pablo</h2>
          <div className="m-2">
            <img
              src={Pablo}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/pablo-mateo-bojanich-developer/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/Bufalito">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Yes</h2>
          <div className="m-2">
            <img
              src={Yes}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/yesminarias-developer/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/YesminArias">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Feli</h2>
          <div className="m-2">
            <img
              src={Feli}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/felipe-ciro-montoya/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/FelipeCiroM">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Alejo</h2>
          <div className="m-2">
            <img
              src={Alejo}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/alejandro-quintero-mejia/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/AlejoMejia96">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Fran</h2>
          <div className="m-2">
            <img
              src={Fran}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/franco-rosignuolo-134957175/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/FranRosig">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
        <div className="flex-col m-2 bg-secondary-100 rounded-lg">
          <h2>Luciano</h2>
          <div className="m-2">
            <img
              src={Luciano}
              alt="not found"
              className="w-20 h-20 rounded-lg mx-auto"
            />
          </div>

          <div className=" flex justify-center ">
            <p className="pr-4">
              <a href="https://www.linkedin.com/in/luciano-marcos-mu%C3%B1oz-11338b219/">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/linkedin/linkedin-original-wordmark.svg"
                  alt="linkedin"
                  width="60"
                  height="60"
                />{" "}
              </a>{" "}
            </p>
            <p className=" pl-4">
              <a href="https://github.com/LucMuno">
                {" "}
                <img
                  src="https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original-wordmark.svg"
                  alt="github"
                  width="40"
                  height="40"
                />{" "}
              </a>{" "}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
