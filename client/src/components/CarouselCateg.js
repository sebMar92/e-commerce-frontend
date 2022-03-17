import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, getCategories } from '../Redux/Action types/types';
import Slider from "react-slick"
import { Link } from 'react-router-dom';
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import CardHome from './CardHome';


export default function CarouselCateg () {

    const dispatch = useDispatch();
    /* const allProducts = useSelector((state) => state.products); */
    const allProducts = [
        {
        "name": "Microsoft Authorized Refurbished- HP Elite Desktop PC Computer Intel Core i5 3.1-GHz, 8 gb Ram, 1 TB Hard Drive, DVDRW, 19 Inch LCD Monitor, Keyboard, Mouse, USB WiFi, Windows 10 (Renewed) ",
        "id": 1,
        "price": 212.69,
        "shippingCost": 67.32,
        "stock": 100,
        "description": "POWERFUL PROCESSOR - Built with an Intel Core i5 processor, you can expect fast, reliable performance and an exceptional PC experience. SUPERIOR STORAGE AND MEMORY - Plenty of storage space to save your favorite media and still have tons of room to work. The high amount of memory will help you zip through your tasks in a hurry. BUILT IN CONNECTIVITY - Stay connected to the internet with USB WiFi adapter. Play your favorite tunes with stereo sound. Connect to large and multiple monitors thanks to onboard Display Port technology. Genuine Windows Software:Help keep your business data safe when you buy used Windows computers, preinstalled with genuine Microsoft software from a Microsoft Authorized Refurbisher, (MAR).WINDOWS 10 LATEST RELEASE - A new, clean installation completely free of bloatware that would have typically been installed from the OEM. Optional software such as Anti-Virus and Office 365 can be easily downloaded through the Windows App Store.   ",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/714T3JNoA3S._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/6126hV4idnS._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61Rq2wgIXhL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Computers",
        "Pc Desktop"
        ]
        },
        {
        "name": "Acer Aspire TC-1660-UA92 Desktop | 10th Gen Intel Core i5-10400 6-Core Processor | 12GB 2666MHz DDR4 | 512GB NVMe M.2 SSD | 8X DVD | Intel Wireless Wi-Fi 6 | Bluetooth 5.2 | Windows 10 Home ",
        "id": 2,
        "price": 549,
        "shippingCost": 49.84,
        "stock": 100,
        "description": "ROBUST COMPUTING HUB: Tackle any task—from basic computing to multimedia entertainment—every time you power up this beastly machine. Easily expandable and driven by an Intel Core i5 processor, it has the speed, power and storage to do more—everyday!. 10th Generation Intel Core i5-10400 6-Core Processor (Up to 4.3GHz). 12GB 2666MHz DDR4 Memory | 512GB NVMe M.2 SSD | 8X DVD-Writer Double-Layer Drive (DVD-RW). Intel Wireless Wi-Fi 6 AX201 802.11ax Dual-Band 2.4GHz and 5GHz featuring 2x2 MU-MIMO technology | Bluetooth 5.2 | 10/100/1000 Gigabit Ethernet LAN. 1 - USB 3.2 Type C Gen 2 port (up to 10 Gbps) (Front) | 1 - USB 3.2 Gen 2 Ports (Front) | 2 - USB 3.2 Gen 1 Type A Ports (Rear) | 4 - USB 2.0 Ports (Rear) | 2 - HDMI Ports (Rear). Windows 10 Home | USB Keyboard and Mouse Included. ",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/616BXacLrRS._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61nlgERWGqS._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/81TFYhzaZVS._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Pc Desktop",
        "Computers"
        ]
        },
        {
        "name": "Lenovo IdeaCentre AIO 3 AMD All-in-One Computer, 24' FHD Display, Ryzen 5 5500U, 16GB RAM, 512GB SSD, DVD RW Drive, Windows 11 ",
        "id": 3,
        "price": 749.99,
        "shippingCost": 39.25,
        "stock": 100,
        "description": "This space-saving AIO PC hides raw, unfiltered power - with an AMD Ryzen 5 55000U processor, the IdeaCentre AIO 3 thrives under heavy performance loads. We designed the slim and compact all-in-one computer for ease and convenience with fewer cables and clutter, a dock for your cell phone, plus instant privacy and instant login features for better security; wireless keyboard and mouse included. View more of the screen with this AIO computer's three-sided narrow bezel FHD display for vibrant colors with crystal-clear quality from almost any angle; plus, the IdeaCentre AIO 3 streams high-octane, sharply etched audio over its two 3W stereo speakers certified by Harman Kardon. The hidden camera on the top of the AIO 3 offers up to 5M clarity, enhancing authenticity during your video chatting or conferencing – push the webcam down for extra security. Connect with two USB 2.0 ports and two USB 3.2 Gen 2 Type-A ports, one 1000 LAN, one microphone/earphone combo, one Power DC Jack and one HDMI-out.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/71guoY+nr7L._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/51ZVBPRGA-L._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/81tCxgRgMcL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61ld4r8k-wL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Pc Desktop",
        "Computers"
        ]
        },
        {
        "name": "Gaming PC Desktop Computer by Alarco Intel i5 3.10GHz,8GB Ram,1TB Hard Drive,Windows 10 pro,WiFi Ready,Video Card Nvidia GTX 650 1GB, 3 RGB Fans with Remote ",
        "id": 4,
        "price": 499.99,
        "shippingCost": 49.99,
        "stock": 100,
        "description": "Runs Fortnite average 100 FPS on Low Settings and 60 FPS on medium settings. Runs Pubg average 30 FPS on low settings. Runs GTA5 average 30 FPS. Intel Core i5-2400 3.10 Ghz. GTX 650 1GB Video Card With DVI, HDMI and VGA outputs. 1 Year Warranty.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/71z7ztyH1LL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71JVLn70koL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71lYdxxNBWL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Gaming",
        "Pc Desktop",
        "Computers"
        ]
        },
        {
        "name": "SkyTech Archangel 3.0 Gaming Computer PC Desktop - Ryzen 5 3600 6-Core 3.6GHz, RTX 3060 12GB, 1TB SSD, 16GB DDR4 3200, RGB Fans, AC WiFi, 600W Gold PSU, Windows 10 Home 64-bit, White ",
        "id": 5,
        "price": 1399.99,
        "shippingCost": 39.99,
        "stock": 100,
        "description": "AMD Ryzen 5 3600 6-Core 3.6 GHz (4.2 GHz Turbo) CPU Processor | 1TB SSD. GeForce RTX 3060 12GB GDDR6 Graphics Card (Brand May Vary) | 16GB DDR4 3200MHz Gaming Memory with Heat Spreaders | Windows 10 Home 64-bit. 802.11AC | No Bloatware | Graphic output options include 1 x HDMI, and 1 x Display Port Guranteed, Additional Ports may vary | USB Ports Including 2.0, 3.0, and 3.2 Gen1 Ports | HD Audio and Mic | Free Gaming Keyboard and Mouse. Heatsink & 3 x RGB Fans | Powered by 80 Plus Gold Certified 600 Watt Power Supply | Skytech Archangel 3.0 Gaming Case with Tempered Glass – White. 1 Year Warranty on Parts and Labor | Lifetime Free Technical Support | Assembled in the USA | This powerful gaming PC is capable of running all your favorite games such as World of Warcraft, League of Legends, Grand Theft Auto V, Apex Legends, Fortnite, Roblox, PLAYERUNKNOWN’s Battlegrounds, Overwatch, Counter-Strike: Global Offensive, Battlefield V, Minecraft, The Division 2, and more at High to Ultra settings, crisp 1440p Full HD resolution and smooth 60+ FPS game play. ",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/81GZeBFAzSS._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/913c4IJx+pS._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61YkzShkk9S._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Gaming",
        "Pc Desktop",
        "Computers"
        ]
        },
        {
        "name": "Acer Predator Orion 3000 PO3-630-UA15 Gaming Desktop | 11th Gen Intel Core i7-11700F 8-Core | GeForce RTX 3070 | 16GB DDR4 | 512GB NVMe SSD | 1TB HDD | Wi-Fi 6 | Windows 11 Home | RGB Keyboard & Mouse ",
        "id": 6,
        "price": 1699.99,
        "shippingCost": 45.89,
        "stock": 100,
        "description": "11th Generation Intel Core i7-11700F 8-Core Processor (Up to 4.9GHz), 16GB DDR4 3200MHz Memory (expandable to 64GB), 512GB NVMe M.2 SSD, 1TB 7200RPM HDD. NVIDIA GeForce RTX 3070 Graphics with 8GB of GDDR6 Video Memory (3 x Display Ports & 1 x HDMI Port). DTS X: Ultra Audio, Intel Wireless Wi-Fi 6 AX201 802.11ax, Killer Ethernet E2600 10/100/1000 Gigabit Ethernet. 1 - USB 3.2 (Type C) Gen 2 Port (Up to 10Gbps) (Front), 1 - USB 3.2 Gen 2 Port (Front), 1 - USB 3.2 (Type C) Gen 2x2 port (Up to 20Gbps) (Rear), 2 - USB 3.2 Gen 1 Type-A Ports (Rear), 2 - USB 2.0 ports (Rear). Predator RGB Gaming Keyboard and Predator RGB Gaming Mouse Included, Comes with Windows 11.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/81OoaPmgzQL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61BqM1OBg1L._AC_SL1000_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61D688R5MtL._AC_SL1000_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Gaming",
        "Computers",
        "Pc Desktop"
        ]
        },
        {
        "name": " Logitech MK345 Wireless Combo Full-Sized Keyboard with Palm Rest and Comfortable Right-Handed Mouse, 2.4 GHz Wireless USB Receiver, Compatible with PC, Laptop ",
        "id": 7,
        "price": 49.74,
        "shippingCost": 15.89,
        "stock": 100,
        "description": "Full-size Keyboard Layout: Comfortable, quiet typing on a familiar keyboard layout with generous palm rest, spill-resistant design (2), and easy-access media keys like mute, volume, and play. Comfortable Right-handed Mouse: This wireless USB mouse features a hand-friendly contoured shape for all-day comfort, plus smooth, precise tracking and scrolling for easier navigation. Reliable Connection: Advanced 2.4 GHz wireless connection delivers the reliability and speed of a corded connection with wireless convenience and freedom up to 33 ft away (3), at home or at work. Extended Battery: Say goodbye to the hassle of charging cables and changing batteries and get up to 3 years of battery life for the keyboard and 18 months for the mouse (1) with MK345. Compatibility: This keyboard mouse set works with PCs using Windows or Chrome operating systems; simply plug in to your laptop or desktop computer and begin using. Upgrade to Logitech MK540 Combo: For increased comfort try MK540 wireless keyboard and mouse combo, with scooped keys, a palm rest, a full-size mouse with soft rubber grips, and customizable shortcuts.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/61S0sV1a57L._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71a9iHlX2fL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71FJ0dmwniL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71oPLv+G8EL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Peripheral"
        ]
        },
        {
        "name": "Redragon S101 Wired Gaming Keyboard and Mouse Combo RGB Backlit Gaming Keyboard with Multimedia Keys Wrist Rest and Red Backlit Gaming Mouse 3200 DPI for Windows PC Gamers (Black) ",
        "id": 8,
        "price": 35.98,
        "shippingCost": 13.58,
        "stock": 100,
        "description": "PC GAMING KEYBOARD AND GAMING MOUSE COMBO: Includes Redragon RGB Backlit Computer Gaming Keyboard and RGB Backlit Gaming Mouse. ALL-IN-ONE PC GAMER VALUE KIT, Fantastic for Gamers (New Improved Version). RGB BACKLIT GAMING KEYBOARD; 7 different RGB Lighting modes & effects, 4 backlight brightness levels, adjustable breathing speed. The keycaps offering clear uniform backlighting WIN key can be disabled for gaming. The PC Gaming Keyboard has been ergonomically designed to be a superb typing tool for office work as well. The gaming Keyboard is built to withstand the average liquid spill. The integrated wrist rest gives you the comfort you need for marathon gaming sessions. MULTI MEDIA & ANTI GHOSTING; The Gaming Keyboard has 25 conflict free (n-Key Rollover) 10 Dedicated Multimedia keys plus 12 additional FN+ Multimedia keys (Total 114 keys). Keys are quiet, designed for longevity, durability delivering precise tactile feedback. Comes with Full numeric keypad and a gold-plated corrosion free USB connector for a reliable connection and ultimate Gaming performance. WIRED GAMING MOUSE; Ergonomic Redragon RED Backlit Gaming Mouse up to 3200 DPI (user adjustable 800/1600/2400/3200 DPI), 30G acceleration and Weight Tuning set. Total 6 Buttons of which 5 are programmable. The High-Precision Sensor delivers Pinpoint Accuracy while the Gaming Grade Micro Switches ensure longevity, greater durability and extreme responsiveness, giving you an even greater edge over your competition. PC GAMING KEYBOARD AND GAMING MOUSE COMPATIBILITY: Windows 10, Windows 8, Windows 7, Windows Vista, or Windows XP, Limited Mac OS keyboard support. Works well with all major Computers Brands and Gaming PCs.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/71kr3WAj1FL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71uIslKmtoL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71H6y1GGbAL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71z+9JkYFJL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Peripheral"
        ]
        },
        {
        "name": "Rii Primer RGB Compact Gaming Office Keyboard RK104,Backlight Keyboard,Small 87 Keys No Number Pad Keyboard for Windows PC Laptop Desktop",
        "id": 9,
        "price": 10.49,
        "shippingCost": 4.5,
        "stock": 100,
        "description": "[LED Mixed Color Backlit]Colorful LED light backlit ,it makes the keys easy to see even in the dark,the light is soft to protect your eyes.NOTE:The backlight cann't be change in one color,it's rainbow and changed automatically. [Compact 87 keys Design Save Space]No additional number keys,can meet you demands in office or home ,you will be satified at how much space you save. [System Compatibility]Windows 8, Windows 7, Windows Vista, Windows XP.PC Laptop Pad Google Android TV Box HTPC IPTV Smart TV Mac IOS Raspberry Pi all version. [Good Quality but cheap]ABS keycaps design product the letter of characters not fade.Enjoy yourself with the payment more than what you've paid. After-sales service]We provide refund without any reason in 30 days,12-month quality guarantee, If you have any problem during the use ,hope you could send message to us firstly and we will try to help you in time.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/71iavnEuc2L._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/71sAev97FDL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/81YWmodg4+L._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Peripheral",
        "Keyboards"
        ]
        },
        {
        "name": "Verbatim Slimline Full Size Wired Keyboard USB Plug-and-Play - Compatible with PC, Laptop - Black ",
        "id": 10,
        "price": 8.95,
        "shippingCost": 5.78,
        "stock": 100,
        "description": "Affordable, corded keyboard featuring slim design and full numeric keypad. Low-profile, advanced tactile keys for quiet, comfortable typing. Adjustable tilt legs for added comfort. Simple, plug-and-play USB corded connection - PC, Mac and Chrome OS compatible. Verbatim has been a leader in data storage technology since 1969, and guarantees this product with a 1-year limited warranty and technical support.",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/719LFu+MawL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/710UmAJF5nL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/81sixpQPW1L._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Keyboards",
        "Peripheral"
        ]
        },
        {
        "name": "Logitech M510 Wireless Computer Mouse for PC with USB Unifying Receiver - Graphite",
        "id": 11,
        "price": 29.99,
        "shippingCost": 12.99,
        "stock": 100,
        "description": "Your hand can relax in comfort hour after hour with this ergonomically designed mouse. Its contoured shape with soft rubber grips, gently curved sides and broad palm area give you the support you need for effortless control all day long. You’ve got the control to do more, faster. Flipping through photo albums and Web pages is a breeze, especially for right-handers—with three standard buttons plus Back/Forward buttons that you can also program to switch applications, go full screen and more. And side-to-side scrolling plus zoom gives you the power to scroll horizontally and vertically through your music library, maps and Facebook feeds, and zoom in and out of photos and budget spreadsheets with a click. 2 years of battery life practically eliminates the need to replace batteries. The On/Off switch helps conserve power, smart sleep mode extends battery life and an indicator light eliminates surprises. The tiny Logitech Unifying receiver stays in your laptop. There’s no need to unplug it when you move around, so there’s less worry of it being lost. And you can easily add compatible wireless mice and keyboards to the same wireless receiver. ",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/61xgpXecLML._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61nAuaWzAfL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61oJmQ+ajhL._AC_SL1500_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/611DG-+B2XL._AC_SL1500_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Mouse",
        "Peripheral"
        ]
        },
        {
        "name": "NexiGo N60 1080P Web Camera, HD Webcam with Microphone, Software Control & Privacy Cover, USB Computer Camera, 110-degree FOV, Plug and Play, for Zoom/Skype/Teams, Conferencing and Video Calling ",
        "id": 12,
        "price": 39.99,
        "shippingCost": 10,
        "stock": 100,
        "description": "Full HD 1080P Webcam】Powered by a 1080p FHD two-MP CMOS, the NexiGo N60 Webcam produces exceptionally sharp and clear videos at resolutions up to 1920 x 1080 with 30fps. The 3.6mm glass lens provides a crisp image at fixed distances and is optimized between 19.6 inches to 13 feet, making it ideal for almost any indoor use. 【USB Webcam with Privacy Protection Cover】The privacy cover blocks the lens when the webcam is not in use. It's perfect to help provide security and peace of mind to anyone, from individuals to large companies. It also helps to protect the lens from dirt and debris to ensure your video remains clear for the life of the camera. 【Built-in Noise-Cancelling Microphone】The built-in noise-canceling microphone reduces ambient noise to enhance the sound quality of your video. Great for Zoom / Facetime / Video Calling / OBS / Twitch / Facebook / YouTube / Conferencing / Gaming / Streaming / Recording / Online School. 【Plug and Play】The fixed focal length lens captures high-definition video at a wide-angle of up to 110°, making it ideal for presentations. Just plug the USB into your computer and you are good to go! A convenient mounting clip allows the webcam to be placed on any monitor / laptop / TV/ tripod. 【Wide Compatibility】Works with USB 2.0/3.0, no additional drivers required. Ready to use in approximately one minute or less on any compatible device. Compatible with Mac OS X 10.7 and higher / Windows 7, 8, 10 & 11 / Android 4.0 or higher / Linux 2.6.24 / Chrome OS 29.0.1547 / Ubuntu Version 10.04 or above. ",
        "images": [
        {
        "url": "https://m.media-amazon.com/images/I/51xRoLtOjgS._AC_SL1463_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/61Fc5OJ7k8S._AC_SL1000_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/613BcIP31mS._AC_SL1000_.jpg",
        "altText": ""
        },
        {
        "url": "https://m.media-amazon.com/images/I/51qSFGA3s0S._AC_.jpg",
        "altText": ""
        }
        ],
        "categories": [
        "Cameras",
        "Peripheral"
        ]
        }];

    /* const allCategories = useSelector((state) => state.categories); */

    useEffect(() => {
        dispatch(getProducts());
        dispatch(getCategories());
    }, [dispatch]);

    function SampleNextArrow(props) {
      const { className, style, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }
    
    function SamplePrevArrow(props) {
      const { className, style={"width":"400px"}, onClick } = props;
      return (
        <div
          className={className}
          style={{ ...style, display: "block", background: "red" }}
          onClick={onClick}
        />
      );
    }

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
      

    return(
      <div >
        <Slider {...settings}>
          {allProducts.map(product => {
          return(
            <div >
              <CardHome 
                key={product.id}
                id={product.id}
                image={product.images[0].url}
                name={product.name}
                price={product.price}
            />
            </div>
              );
            })
          }
        </Slider>
      </div>
    );
}

<br/>

/* <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
  <div className="w-full relative flex items-center justify-center">
    <div className="flex items-center justify-center w-full h-full py-24 sm:py-8 px-4">
        <div className="w-full relative flex items-center justify-center">
            <div className="w-full h-full mx-auto overflow-x-hidden overflow-y-hidden">
                <div id="slider" className="h-full flex lg:gap-8 md:gap-6 gap-14 items-center justify-start transition ease-out duration-700">
                    <div className="flex flex-shrink-0 relative w-full sm:w-auto">
                    {allProducts.length > 0 && (
                        allProducts.map(product => {
                            return(<CardHome 
                                key={product.id}
                                id={product.id}
                                image={product.images[0].url}
                                name={product.name}
                                price={product.price}
                            />
                            
                        )}))};
                    </div>
                </div>
            </div>
        </div>
        </div>
        </div>
    </div> */