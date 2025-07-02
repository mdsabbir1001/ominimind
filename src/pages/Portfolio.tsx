import React, { useState, useEffect, useRef } from 'react'; // Import useEffect and useRef
import { motion } from 'framer-motion'; // Import motion from framer-motion
// Function: ID
const getAspectRatio = (project: Project): string => {
  // ID based specific ratio override
  const idBasedRatios: { [key: number]: string } = {
    1: '9 / 16', // Branding
    2: '16 / 9', // Web Design
    3: '2 / 3', // Food & Beverage
    330: '1 / 1', // Food & Beverage
    301: '1 / 1', // Product Ads
    302: '3 / 4', // Hoodie
    303: '1 / 1', // Real Estate Social Media
    304: '16 / 9', // YouTube Thumbnails
    305: '1 / 1', // Travel & Tourism
    306: '1 / 1', // Study Abroad
    307: '1 / 1', // Social Media Design
    5: '16 / 9' ,// Packaging Design
    501: '15 / 9' ,// Packaging Design
    502: '6 / 4' ,// Packaging Design
    6: '4 / 3', // T-Shirt
    601: '4 / 3', // T-Shirt
    7: '16 / 9', // Motion Graphics

  };

  // Category based fallback ratios
  const categoryBasedRatios: { [key: string]: string } = {
    branding: '4 / 5',
    web: '16 / 9',
    socialmedia: '9 / 16',
    print: '3 / 4',
    packaging: '1 / 1',
    all: '1 / 1'
  };

  // Priority: ID check > Category check > Default
  return idBasedRatios[project.id] || categoryBasedRatios[project.category] || '1 / 1';
};

import { ExternalLink, Eye, Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';

// Define a type for the project
interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  cardImage: string; // Image for the project card
  // Updated to handle different media types
  modalContent: { type: 'image' | 'video'; url: string }[]; // Array of images/videos for the modal
}

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFullScreenOpen, setIsFullScreenOpen] = useState(false); // State for full-screen preview
  const [currentContentIndex, setCurrentContentIndex] = useState(0); // State for current content index in full-screen
  const [showArrows, setShowArrows] = useState(true); // State to control arrow visibility
  const arrowTimerRef = useRef<NodeJS.Timeout | null>(null); // Ref for the arrow hide timer
  const touchStartX = useRef(0); // Ref to store touch start X coordinate

  // Define animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };


  const filters = [
    { id: 'all', name: 'All Projects' },
    { id: 'branding', name: 'Branding' },
    { id: 'web', name: 'Web Design' },
    { id: 'socialmedia', name: 'Social Media' },
    { id: 'print', name: 'Print Design' },
    { id: 'packaging', name: 'Packaging' },
    { id: 'tshirt', name: 'T-Shirt' },
    { id: 'motiongraphics', name: 'Motion Graphics' },
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: 'Logo & Branding',
      category: 'branding',
      description: "Your Logo is Your First Impression. We design more than just logos; we build powerful, memorable brand identities that connect with your audience. Let's create the face of your business.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Gemini_Generated_Image_8wpabj8wpabj8wpa.png?updatedAt=1750792621371',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/Rustic2.jpg?updatedAt=1750790350275' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/Shine.jpg?updatedAt=1750790350028' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/Vellon.jpg?updatedAt=1750790349998' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/viana2.jpg?updatedAt=1750790350009' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/arcode.jpg?updatedAt=1750790350006' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/button.jpg?updatedAt=1750790349956' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/tiny.jpg?updatedAt=1750790349893' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/briklyn.jpg?updatedAt=1750790349861' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/binary.jpg?updatedAt=1750790349775' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Logo%20Branding/livery.jpg?updatedAt=1750790349755' },
      ]
    },
    {
      id: 2,
      title: 'GreenEarth Website',
      category: 'web',
      description: 'Responsive website design for environmental consulting firm',
      cardImage: 'https://i.ibb.co/3mcRLqgm/Blank.png',
      // Updated to use modalContent
      modalContent: [
        // Add web design images here if available
      ]
    },
    ///// Start Social Media
    {
      id: 3,
      title: 'Food & Beverage',
      category: 'socialmedia',
      description: "Custom design solutions for your restaurant or food brand. We capture the taste and quality of your offerings through stunning visuals that attract customers and boost sales. From social media to packaging, we've got you covered.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/unnamed.png?updatedAt=1750792621206',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/oiup.png?updatedAt=1750791885149' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/Red%20Modern%20Delicious%20Burger%20Sale%20Poster%20(2).png?updatedAt=1750791883761' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/3.png?updatedAt=1750791883711' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/4.png?updatedAt=1750791883621' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/5.png?updatedAt=1750791883504' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Portrait/Red%20Modern%20Delicious%20Burger%20Sale%20Poster%20(4).png?updatedAt=1750791881963' },
      ]
    },
    {
      id: 307,
      title: 'Social Media Design',
      category: 'socialmedia',
      description: "Stop the Scroll. We design stunning, on-brand social media content that captivates your audience and drives growth. From daily posts to full campaigns, let's make your brand unforgettable online.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Social%20Media%20Design.png?updatedAt=1750792614526',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/T-shirt-d.png?updatedAt=1750803111214' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/T-shirt-00.png?updatedAt=1750803110219' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/mobile-tech-ads-design.jpg?updatedAt=1750806109042' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/image.png?updatedAt=1750806415519' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image.png?updatedAt=1750803109890' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/mobile-ad-design-ipone.jpg?updatedAt=1750806108915' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/Offer..%20Working.png?updatedAt=1750866906842' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/Car2.png?updatedAt=1750866907190' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/car4.png?updatedAt=1750866907401' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/monile-ad-design.jpg?updatedAt=1750806108772' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Social%20Media/manipulation-Recovered.png?updatedAt=1750806118572' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image(1).png?updatedAt=1750803110198' },
      ]
    },
    {
      id: 330,
      title: 'Food & Beverage',
      category: 'socialmedia',
      description: "Custom design solutions for your restaurant or food brand. We capture the taste and quality of your offerings through stunning visuals that attract customers and boost sales. From social media to packaging, we've got you covered.",
      cardImage: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl.jpg?updatedAt=1750793908540',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/Hello%20(1).png?updatedAt=1750793910083' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/Hello%20(12).png?updatedAt=1750793908839' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl%20(3).jpg?updatedAt=1750793908675' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl.jpg?updatedAt=1750793908540' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl%20(2).jpg?updatedAt=1750793908201' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl%20(4).jpg?updatedAt=1750793908198' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/DEl%20(1).jpg?updatedAt=1750793907942' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/image.png?updatedAt=1750802712502' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/image(4).png?updatedAt=1750802712450' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/image(3).png?updatedAt=1750802712217' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/image(1).png?updatedAt=1750802712142' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Food%20&%20Beverage%20Squire/image(2).png?updatedAt=1750802711901' },
      ]
    },
    {
      id: 301,
      title: 'Advertisement Design',
      category: 'socialmedia',
      description: "Stop the scroll and capture your audience. We create social media ads that don't just look beautiful - they deliver your brand's message clearly and are built to drive sales. Let our designs make your next campaign a success.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Gemini_Generated_Image_avrlr2avrlr2avrl.png?updatedAt=1750792621468',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/2.png?updatedAt=1750805483741' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/5.png?updatedAt=1750805483542' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/Untitled-2.png?updatedAt=1750805483450' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/4.png?updatedAt=1750805482970' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/4.png?updatedAt=1750805482970' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/Social-media-Marketing-Banner.png?updatedAt=1750805483062' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/a1.png?updatedAt=1750805483045' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/6.png?updatedAt=1750805483321' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Ads/EMI.png?updatedAt=1750805483099' },
      ]
    },
    {
      id: 302,
      title: 'Hoodie',
      category: 'socialmedia',
      description: "Sell more than just hoodies! sell a lifestyle. Our social media designs for fashion brands create a powerful online presence, turning followers into loyal customers.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Image_tv8u5htv8u5htv8u%20(Small).png?updatedAt=1750792615056',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodei-design-2.jpg?updatedAt=1750804620314' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodei-design-1.jpg?updatedAt=1750804620290' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodie-new.jpg?updatedAt=1750804620270' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodie-new-2.jpg?updatedAt=1750804620211' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodie-4.jpg?updatedAt=1750804620229' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Hoodie/hoodie-3.png?updatedAt=1750804620112' },
      ]
    },
    {
      id: 303,
      title: 'Real Estate Social Media',
      category: 'socialmedia',
      description: "Elevate your real estate brand's online presence with our stunning social media designs. We create visually appealing covers and ads that capture attention and drive engagement for your property listings and company.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Image_im3av1im3av1im3a.png?updatedAt=1750792622374',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Real%20Estate/e390c9215329117-676953272217e.jpg?updatedAt=1750805156663' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Real%20Estate/real-state-design-4.jpg?updatedAt=1750805156527' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Real%20Estate/real-estate-design.jpg?updatedAt=1750805156478' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Real%20Estate/real-estate-3.jpg?updatedAt=1750805156415' },
      ]
    },
    {
      id: 304,
      title: 'YouTube Thaumbnails',
      category: 'socialmedia',
      description: "our video's first impression matters. We create professional, high-quality YouTube thumbnails designed to stop the scroll, spark curiosity, and dramatically increase your views.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/kwuasokwuasokwua.png?updatedAt=1750792615437',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image.png?updatedAt=1750804101184' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(2).png?updatedAt=1750804100537' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(10).png?updatedAt=1750804106012' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image.png?updatedAt=1750806305175' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(3).png?updatedAt=1750804101522' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(1).png?updatedAt=1750804101031' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(4).png?updatedAt=1750804101292' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(6).png?updatedAt=1750804100817' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(9).png?updatedAt=1750804100689' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(8).png?updatedAt=1750804099516' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(5).png?updatedAt=1750804100667' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(11).png?updatedAt=1750804106358' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Youtube%20Thumbnail/image(7).png?updatedAt=1750804099596' },
      ]
    },
    {
      id: 305,
      title: 'Travel & Tourism',
      category: 'socialmedia',
      description: "From breathtaking destinations to boutique hotels, our social media designs showcase the best of travel. We help you build a captivating online presence that drives bookings and grows your brand",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Image_2e3uvf2e3uvf2e3u.png?updatedAt=1750792621829',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Travel/image1.png?updatedAt=1750805903253' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Travel/adf.png?updatedAt=1750805903196' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Travel/image.png?updatedAt=1750805902987' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Travel/travel-2.jpg?updatedAt=1750805902689' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Travel/image%20(1).png?updatedAt=1750805902616' },
      ]
    },
    {
      id: 306,
      title: 'Study Abroad',
      category: 'socialmedia',
      description: "Begin your global education journey with confidence. We design compelling social media campaigns and materials for study abroad programs that inspire students and connect them with world-class opportunities.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Planning-to-study-abroad.jpg?updatedAt=1750792614719',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image(2).png?updatedAt=1750803672306' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image(1).png?updatedAt=1750803672942' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image.png?updatedAt=1750803671864' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Study%20Abroad/image(3).png?updatedAt=1750803672554' },
      ]
    },
    /////Social Media End
    ///// Start Print Design




    //// End Print Design
    //// Start Packaging Design
    {
      id: 5,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Creative and structural packaging design for beauty products. We craft unique boxes that not only protect the product but also tell a compelling brand story from the first glance.",
      cardImage: 'https://ik.imagekit.io/minimind/Packaging%20Design/mud%20mask%20box.jpg?updatedAt=1750796431148',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/1.jpg?updatedAt=1750796430723' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/1.jpg?updatedAt=1750796430723' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/m003t0541_a_sachet_packets_31jul22.jpg?updatedAt=1750796430505' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/3.jpg?updatedAt=1750796430518' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/4.jpg?updatedAt=1750796430507' },
      ]
    },
    {
      id: 501,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Clean and fresh packaging design for cosmetic and skincare brands. Our designs reflect the purity and quality of your natural ingredients, creating an irresistible appeal for customers.",
      cardImage: 'https://ik.imagekit.io/minimind/Packaging%20Design/Essential%20Oil%20Dropper%20Bottle%20Mockup.jpg?updatedAt=1750796674196',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/01.jpg?updatedAt=1750796896192' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/mockup%20essential%2005.jpg?updatedAt=1750796674171' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/essential%203%20jpg.jpg?updatedAt=1750796674167' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/Essential_Oil_Bottle_Mockup.jpg?updatedAt=1750796674382' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/Two_Essential_Oil_Bottles_Mockup%204.jpg?updatedAt=1750796674652' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/Free_Dropper_Bottle_Mockup%203.jpg?updatedAt=1750796673948' },
      ]
    },
    {
      id: 502,
      title: 'Packaging Design',
      category: 'packaging',
      description: "Professional and trustworthy packaging for pharmaceutical and wellness products. We design clear, informative, and clean packaging that builds consumer confidence and communicates reliability.",
      cardImage: 'https://ik.imagekit.io/minimind/Packaging%20Design/Box-Vol-1-Top-2.jpg?updatedAt=1750796982134',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/Package%20Box%2002.579.png?updatedAt=1750796982822' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/X%C6%AF%C6%A0NG%20NANO.png?updatedAt=1750796982364' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/Packaging%20Design/Box-Vol-1-Top-2.jpg?updatedAt=1750796982134' },
      ]
    },


    /////T-Shirt
    {
      id: 6,
      title: 'T-Shirt Design',
      category: 'tshirt',
      description: "More than just a T-shirt, it's a statement. Our collection of graphic tees is designed for self-expression. Find the design that speaks to you and wear your story.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/unnamed%20(1).png?updatedAt=1750792615010',
      // Updated to use modalContent
      modalContent: [
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-14%20at%2018.05.26_0b95d56b.jpg?updatedAt=1750794958012' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/download%20(4).jpg?updatedAt=1750794957740' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/download%20(2).jpg?updatedAt=1750794957534' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/dd3ba631-6398-46d2-87b8-8feae7007de1.jpg?updatedAt=1750794957283' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/85143516-084e-4abf-b8bf-c0cd3eddec97.jpg?updatedAt=1750794953914' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/82a36aa2-e70b-4be8-877e-43ae3b5bf6a3.jpg?updatedAt=1750794953033' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/74e03a0e-a140-4556-b3aa-76c8425de052.jpg?updatedAt=1750794953005' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/640635de-f159-4cf9-a404-14b549157dd8.jpg?updatedAt=1750794952771' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/19ad8543-7146-453f-8365-6dfc0094a6af.jpg?updatedAt=1750794952772' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/7ac8f46f-6107-4213-9a5b-eef9dd7c0c4f.jpg?updatedAt=1750794952630' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.12_414a6ed4.jpg?updatedAt=1750794952486' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.12_f920e44e.jpg?updatedAt=1750794952454' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/8b10ec8b-4a0b-48fd-a33a-a6d538cb675f.jpg?updatedAt=1750794952317' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/0f1bf2d9-da44-4fc7-856c-91944fef271a.jpg?updatedAt=1750794952265' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.11_3d32c0b8.jpg?updatedAt=1750794947565' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.06_b2cd8d5e.jpg?updatedAt=1750794947507' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.07_da993a17.jpg?updatedAt=1750794947453' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-27%20at%2015.48.54_bf32f275.jpg?updatedAt=1750794947450' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-05-09%20at%2018.42.05_827df233.jpg?updatedAt=1750794947391' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-27%20at%2015.48.54_e5a8e935.jpg?updatedAt=1750794947149' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-28%20at%2019.12.14_bddc97dc.jpg?updatedAt=1750794947043' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-16%20at%2001.45.10_a7ae5978.jpg?updatedAt=1750794946897' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2015.58.38_dc9a1872.jpg?updatedAt=1750794946722' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-16%20at%2001.45.10_616adbc5.jpg?updatedAt=1750794946725' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2015.58.38_664bff19.jpg?updatedAt=1750794941786' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2010.57.39_4ecf683d.jpg?updatedAt=1750794941674' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2015.58.38_798acd61.jpg?updatedAt=1750794941650' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-14%20at%2018.50.35_ae6747ca.jpg?updatedAt=1750794941354' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2015.58.37_0195ca34.jpg?updatedAt=1750794941297' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-14%20at%2022.03.33_ef467b65.jpg?updatedAt=1750794941295' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2000.30.24_3c435498.jpg?updatedAt=1750794941210' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2015.58.37_99925724.jpg?updatedAt=1750794941061' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2010.57.39_174a4336.jpg?updatedAt=1750794940807' },
        { type: 'image', url: 'https://ik.imagekit.io/minimind/T-shirt%20A/WhatsApp%20Image%202025-04-15%20at%2010.57.39_cefea9d2.jpg?updatedAt=1750794940803' },
      ]
    },
    {
      id: 7,
      title: 'Motion Graphics',
      category: 'motiongraphics',
      description: "Authentic Designs for True Fans. We specialize in creating powerful, anime-inspired graphics that resonate deeply with the culture. Attract a dedicated fanbase and boost your brand with designs that honor their favorite characters and stories.",
      cardImage: 'https://ik.imagekit.io/minimind/Cover/Image_9f55z89f55z89f55.png?updatedAt=1750792622573',
      modalContent: [
        { type: 'video', url: 'https://youtu.be/Lx8qfIF3o1w?list=RDLx8qfIF3o1w' }, // Replace with your video URL
        { type: 'video', url: 'YOUR_MOTION_GRAPHICS_VIDEO_URL_2.mp4' }, // Replace with your video URL
        { type: 'image', url: 'https://via.placeholder.com/800x600?text=Motion+Graphic+Image+1' }, // You can mix images and videos
        // Add more video or image objects here
      ]
    },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    setCurrentContentIndex(0); // Reset index when opening modal
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
    setIsFullScreenOpen(false); // Close full screen if open
    setCurrentContentIndex(0); // Reset index
    if (arrowTimerRef.current) { // Clear timer on modal close
      clearTimeout(arrowTimerRef.current);
    }
  };

  const openFullScreen = (index: number) => {
    setCurrentContentIndex(index);
    setIsFullScreenOpen(true);
    setShowArrows(true); // Show arrows when full screen opens
  };

  const closeFullScreen = () => {
    setIsFullScreenOpen(false);
    if (arrowTimerRef.current) { // Clear timer on full screen close
      clearTimeout(arrowTimerRef.current);
    }
  };

  const goToPreviousImage = () => { // Renamed function slightly for clarity, but keeps old name for now
    if (selectedProject) {
      setCurrentContentIndex((prevIndex) =>
        prevIndex === 0 ? selectedProject.modalContent.length - 1 : prevIndex - 1
      );
      setShowArrows(true); // Show arrows on navigation
    }
  };

  const goToNextImage = () => { // Renamed function slightly for clarity, but keeps old name for now
    if (selectedProject) {
      setCurrentContentIndex((prevIndex) =>
        prevIndex === selectedProject.modalContent.length - 1 ? 0 : prevIndex + 1
      );
      setShowArrows(true); // Show arrows on navigation
    }
  };


  // Function to handle right-click and prevent saving
  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  // Handle touch start for swipe
  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX;
    setShowArrows(true); // Show arrows on touch
  };

  // Handle touch end for swipe
  const handleTouchEnd = (event: React.TouchEvent) => {
    if (!selectedProject) return;

    const touchEndX = event.changedTouches[0].clientX;
    const swipeThreshold = 50; // Minimum distance for a swipe

    // Check if the touch started and ended on the image/video itself, not the buttons
    const target = event.target as HTMLElement;
    // Added check for video tag
    if (target.tagName === 'IMG' || target.tagName === 'VIDEO' || target.classList.contains('relative')) { // Check if target is the media or the container div
       if (touchStartX.current - touchEndX > swipeThreshold) {
        // Swiped left
        goToNextImage();
      } else if (touchEndX - touchStartX.current > swipeThreshold) {
        // Swiped right
        goToPreviousImage();
      } else {
        // Tap - toggle arrows
        setShowArrows(prev => !prev);
      }
    }
  };

  // Effect to hide arrows after a delay
  useEffect(() => {
    if (isFullScreenOpen && showArrows) {
      if (arrowTimerRef.current) {
        clearTimeout(arrowTimerRef.current);
      }
      arrowTimerRef.current = setTimeout(() => {
        setShowArrows(false);
      }, 1000); // Hide after 1 second
    }

    // Cleanup timer on component unmount or when dependencies change
    return () => {
      if (arrowTimerRef.current) {
        clearTimeout(arrowTimerRef.current);
      }
    };
  }, [isFullScreenOpen, showArrows, currentContentIndex]); // Re-run effect when these states change


  return (
    <div className="py-20 overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div // Animate the Header
          className="text-center mb-16"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of successful projects and see how we've helped businesses
            transform their brand presence through exceptional design.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div // Animate the Filter Buttons container
          className="flex flex-wrap justify-center gap-4 mb-12"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex items-center mr-4">
            <Filter className="w-5 h-5 text-gray-600 mr-2" />
            <span className="text-gray-600 font-medium">Filter by:</span>
          </div>
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {/* Changed from motion.div to div - Removed animation from the grid container */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          // Removed animation props: variants, initial, whileInView, viewport
        >
          {filteredProjects.map((project, index) => (
            // This is already a plain div from the previous change
            <div
              key={project.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.cardImage}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                    <div className="flex space-x-2">
                      {/* Changed onClick to use openModal */}
                      <button
                        className="w-10 h-10 bg-[#2563eb] backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                        onClick={() => openModal(project)}
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                      {/* External link button - keep as is or remove if not needed */}
                      <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white/20 hover:bg-white/20 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div // Animate the CTA Section
          className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white text-center"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Amazing?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Let's work together to bring your vision to life. Start your design journey today
            and see your brand transform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/packages"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Choose a Package
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              Get Custom Quote
            </a>
          </div>
        </motion.div>
      </div>

      {/* Modal Component */}
      {isModalOpen && selectedProject && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-5xl mx-auto relative">
            {/* Close Icon */}
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title and Description */}
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedProject.title}</h2>
              <p className="text-gray-700">{selectedProject.description}</p>
            </div>

            {/* Image/Video Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto h-[60vh]">
              {/* Changed from modalImages to modalContent */}
              {selectedProject.modalContent.map((item, index) => (
                <div key={index} className="w-full cursor-pointer" onClick={() => openFullScreen(index)}>
                  <div style={{ aspectRatio: getAspectRatio(selectedProject) }}>
                    {/* Conditionally render img or video based on item.type */}
                    {item.type === 'image' ? (
                      <img
                        src={item.url}
                        alt={`${selectedProject.title} - ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                        onContextMenu={handleContextMenu}
                        draggable="false"
                      />
                    ) : (
                      <video
                        src={item.url}
                        controls // Add controls for play/pause, volume, etc.
                        className="w-full h-full object-cover rounded-lg"
                        onContextMenu={handleContextMenu}
                        // draggable="false" // draggable is not a standard attribute for video
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>


          </div>
        </div>
      )}

      {/* Full Screen Image/Video Preview Modal */}
      {isFullScreenOpen && selectedProject && (
        <div
          className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4"
          onTouchStart={handleTouchStart} // Add touch start handler
          onTouchEnd={handleTouchEnd} // Add touch end handler
          onClick={() => setShowArrows(true)} // Show arrows on click anywhere in fullscreen
        >
          {/* Close Button */}
          <button
            onClick={closeFullScreen}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
          >
            <X className="w-8 h-8" />
          </button>

          {/* Image/Video */}
          <div className="relative flex items-center justify-center w-full h-full">
             {/* Conditionally render img or video based on current item type */}
            {selectedProject.modalContent[currentContentIndex].type === 'image' ? (
              <img
                src={selectedProject.modalContent[currentContentIndex].url}
                alt={`${selectedProject.title} - ${currentContentIndex + 1}`}
                className="max-w-full max-h-full object-contain" // Use object-contain to fit image
                onContextMenu={handleContextMenu}
                draggable="false"
              />
            ) : (
               <video
                src={selectedProject.modalContent[currentContentIndex].url}
                controls // Add controls for play/pause, volume, etc.
                className="max-w-full max-h-full object-contain" // Use object-contain to fit video
                onContextMenu={handleContextMenu}
                // draggable="false" // draggable is not a standard attribute for video
              />
            )}


            {/* Navigation Buttons */}
            {/* Changed condition to use modalContent length */}
            {selectedProject.modalContent.length > 1 && (
              <>
                <button
                  onClick={goToPreviousImage}
                  className={`absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity ${showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Control visibility and pointer events
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className={`absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full transition-opacity ${showArrows ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} // Control visibility and pointer events
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;