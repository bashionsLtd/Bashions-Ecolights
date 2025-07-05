import Image from 'next/image';
import {
  FaTwitter,
  FaFacebookF,
  FaInstagram,
  FaGithub,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white text-gray-400 pt-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl pb-8 mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
                <h4 className="text-black mb-4 font-semibold">Company</h4>
                <ul className="space-y-3">
                    <li><a href="#">Home</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">FAQ</a></li>
                    <li><a href="#">Career</a></li>
                </ul>
            </div>

            {/* Column 2 */}
            <div>
                <h4 className="text-black mb-4 font-semibold">Products</h4>
                <ul className="space-y-3">
                    <li><a href="#">Lighting</a></li>
                    <li><a href="#">Lamps</a></li>
                    <li><a href="#">Arts & Decolations</a></li>
                    <li><a href="#">Posters & Billboards</a></li>
                </ul>
            </div>

            {/* Column 3 */}
            <div>
                <h4 className="text-black mb-4 font-semibold">Resources</h4>
                <ul className="space-y-3">
                    <li><a href="#">Past Projects</a></li>
                    <li><a href="#">Blog</a></li>
                    <li><a href="#">Crafting process</a></li>
                    <li><a href="#">Terms & Conditions</a></li>
                </ul>
            </div>

            {/* Column 4 */}
            <div>
                <h4 className="text-black mb-4 font-semibold">Address & Contacts</h4>
                <ul className="space-y-3">
                    <li>8724+V8X, Rue Industrie,</li>
                    <li>Gisenyi/Rubavu, Rwanda</li>
                    <li>+250784531278</li>
                    <li>Patri@gmail.com</li>
                </ul>
            </div>
        </div>

        <div className="border-t border-gray-700 flex flex-col sm:flex-row items-center justify-between text-sm text-gray-500">
            <Image
                src="/images/logo.png"
                alt="Logo"
                width={90}
                height={90}
            />
            <div className='italic'>© Copyright 2025, All Rights Reserved by Bashions</div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-4 sm:mt-0 text-black">
                <a href="#" aria-label="Twitter">
                    <FaTwitter className="text-lg hover:text-[#1DA1F2]" />
                </a>
                <a href="#" aria-label="Facebook">
                    <FaFacebookF className="text-lg hover:text-[#1877F2]" />
                </a>
                <a href="#" aria-label="Instagram">
                    <FaInstagram className="text-lg hover:text-pink-500" />
                </a>
                <a href="#" aria-label="GitHub">
                    <FaGithub className="text-lg hover:text-gray-300" />
                </a>
            </div>
      </div>
    </footer>
  );
};

export default Footer;
