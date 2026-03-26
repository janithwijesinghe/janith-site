import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
 
import { supabase, type Project } from '../lib/supabase';
import ProjectCard from '../components/ProjectCard';
import { ArrowRight, Code, Palette, Video, Sparkles, Mail, Phone, MapPin, Clock, Award, Users } from 'lucide-react';

export default function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
 let currentSlide = 0;

  const moveSlide = (direction: number) => {
    const slider = document.getElementById("reviewSlider");
    if (!slider) return;

    const totalSlides = slider.children.length;

    currentSlide += direction;

    if (currentSlide < 0) currentSlide = totalSlides - 1;
    if (currentSlide >= totalSlides) currentSlide = 0;

    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  };
  useEffect(() => {
    fetchFeaturedProjects();
  }, []);

  const fetchFeaturedProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index', { ascending: true })
      .limit(3);

    if (data) {
      setFeaturedProjects(data as Project[]);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-black text-white">
      <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in">
 <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[1.2] pb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(59,130,246,0.7)]">
  Creative Digital
</h1>

<h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-[1.2] pb-6 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(34,211,238,0.7)]">
  Solutions
</h2>
            <p className="text-lg sm:text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Social Media Strategy | Video Editing | Web Development
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/portfolio"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105 inline-flex items-center justify-center"
              >
                View My Work
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <button
                onClick={scrollToContact}
                className="border-2 border-blue-600 hover:bg-blue-600 text-white px-8 py-4 rounded-full font-semibold transition-all transform hover:scale-105"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
              <p className="text-gray-400 text-lg mb-6">
                Results-driven Social Media Manager with 8+ years of experience in digital marketing, content strategy, and audience growth.
                 Built and managed 1.7M+ YouTube subscribers, handled 160+ international client projects through Fiverr and Upwork, 
                 and organically grew a 10K+ TikTok community. 
                </p>
              <p className="text-gray-400 text-lg mb-6">
  Skilled in social media strategy, video production, and digital analytics, 
  with a strong technical background as a B.Sc. (Hons) IT graduate from the University of Moratuwa
   
</p>
             
               
              {/* 🔥 STATS CARDS SECTION */}
<div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

  <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600/20">
        <Clock className="text-blue-400" size={28} />
      </div>
    </div>
    <h3 className="text-3xl font-bold">8+</h3>
    <p className="text-gray-400 text-sm mt-1">Years of Experience</p>
  </div>

  <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-600/20">
        <Video className="text-purple-400" size={28} />
      </div>
    </div>
    <h3 className="text-3xl font-bold">1.7M+</h3>
    <p className="text-gray-400 text-sm mt-1">YouTube Subscribers Built</p>
  </div>

  <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-pink-600/20">
        <Award className="text-pink-400" size={28} />
      </div>
    </div>
    <h3 className="text-3xl font-bold">160+</h3>
    <p className="text-gray-400 text-sm mt-1">Client Reviews (Fiverr & Upwork)</p>
  </div>

  <div className="bg-gray-900/60 backdrop-blur border border-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-all duration-300">
    <div className="flex justify-center mb-4">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600/20">
        <Users className="text-green-400" size={28} />
      </div>
    </div>
    <h3 className="text-3xl font-bold">10K+</h3>
    <p className="text-gray-400 text-sm mt-1">TikTok Followers Grown Organically</p>
  </div>

</div>
            </div>
            <div className="relativew-34">
  <div className="relative">
  <div className="w-90 h-90 rounded-2xl overflow-hidden border border-gray-800">
    <img
      src="/social-media.png"
      alt="Profile"
      className="w-full h-full object-cover"
    />
  </div>
</div>
</div>

          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Services</h2>
            <p className="text-gray-400 text-lg">What I can do for you</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="bg-blue-600/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Palette size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Social Media Design</h3>
              <p className="text-gray-400">
                Eye-catching social media content that drives engagement and builds your brand presence.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="bg-purple-600/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Video size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Social Media Management</h3>
              <p className="text-gray-400">
                Managing social media with strategic content, engagement, and performance tracking.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="bg-pink-600/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Sparkles size={32} className="text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">AI Video</h3>
              <p className="text-gray-400">
                Cutting-edge AI-generated video content that pushes creative boundaries.
              </p>
            </div>

            <div className="bg-gray-900 rounded-xl p-8 hover:bg-gray-800 transition-colors border border-gray-800">
              <div className="bg-green-600/20 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                <Code size={32} className="text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Web Development</h3>
              <p className="text-gray-400">
                Modern, responsive websites that deliver exceptional user experiences.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="portfolio-preview" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Portfolio</h2>
              <p className="text-gray-400 text-lg">Explore a collection of my best work across animation, video editing, and digital content creation.</p>
            </div>
            <Link
              to="/portfolio"
              className="hidden md:flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All Projects
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
{/* 🔥 CLIENT REVIEWS SLIDER */}
<div className="mt-20 text-center">
  <h3 className="text-3xl font-bold mb-6">Client Reviews</h3>
  <p className="text-gray-400 mb-10">
    Real feedback from my Fiverr clients
  </p>

  <div className="relative w-full max-w-5xl mx-auto overflow-hidden">

    {/* Slider Images */}
    <div
      id="reviewSlider"
      className="flex transition-transform duration-500"
    >
      <img src="/R1.PNG" className="w-full   flex-shrink-0 rounded-2xl" />
      <img src="/R2.PNG" className="w-full   flex-shrink-0 rounded-2xl" />
      <img src="/R3.PNG" className="w-full   flex-shrink-0 rounded-2xl" />
      <img src="/R4.PNG" className="w-full   flex-shrink-0 rounded-2xl" />
    </div>

    {/* Buttons */}
    <button
      onClick={() => moveSlide(-1)}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2 rounded-full"
    >
      ◀
    </button>

    <button
      onClick={() => moveSlide(1)}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 px-4 py-2 rounded-full"
    >
      ▶
    </button>
  </div>

  {/* Fiverr Button */}
  <div className="mt-10">
    <a
      href="https://www.fiverr.com/s/wkYZyWr"
      target="_blank"
      className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold"
    >
      View More on Fiverr
    </a>
  </div>
</div>
          <div className="mt-12 text-center md:hidden">
            <Link
              to="/portfolio"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
            >
              View All Projects
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-400 text-lg">Let's work together on your next project</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Email</h3>
                  <a href="mailto:hello@example.com" className="text-gray-400 hover:text-blue-400 transition-colors">
                    janithjayarisi@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Phone</h3>
                  <a
  href="https://wa.me/94714352799"
  target="_blank"
  className="text-gray-400 hover:text-blue-400 transition-colors"
>
  +94 (71) 4352799
</a>
                </div>
              </div>
              <div className="flex items-start">
  <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
    <Users size={24} className="text-blue-400" />
  </div>
  <div>
    <h3 className="text-xl font-semibold mb-2">LinkedIn</h3>
    <a
      href="https://www.linkedin.com/in/janith-wijesinghe-9b7886111/"
      target="_blank"
      className="text-gray-400 hover:text-blue-400 transition-colors"
    >
      janith wijesinghe
    </a>
  </div>
</div>
              <div className="flex items-start">
                <div className="bg-blue-600/20 w-12 h-12 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Location</h3>
                  <p className="text-gray-400">Available for remote work worldwide</p>
                </div>
              </div>

            </div>

 <form
  action="https://formsubmit.co/janithjayarisi@gmail.com"
  method="POST"
  onsubmit="alert('Message Sent Successfully!');"
>
  <input type="hidden" name="_captcha" value="false" />

  <input
    type="text"
    name="name"
    placeholder="Your Name"
    required
    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white"
  />

  <input
    type="email"
    name="email"
    placeholder="Your Email"
    required
    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white"
  />

  <textarea
    name="message"
    rows={5}
    placeholder="Your Message"
    required
    className="w-full bg-gray-900 border border-gray-800 rounded-lg px-4 py-3 text-white"
  ></textarea>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold"
  >
    Send Message
  </button>
</form>
          </div>
        </div>
      </section>
    </div>
  );
}
