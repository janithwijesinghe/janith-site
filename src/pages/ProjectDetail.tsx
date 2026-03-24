import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  X,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { supabase, type Project } from '../lib/supabase';

 
type MediaItem = {
  type: 'image' | 'video';
  url: string;
};

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Lightbox
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slug) fetchProject(slug);
  }, [slug]);

  const fetchProject = async (projectSlug: string) => {
    setLoading(true);

    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', projectSlug)
      .maybeSingle();

    if (data) setProject(data as Project);

    setLoading(false);
  };

  // 🔄 Loading
  if (loading) {
    return (
      <div className="bg-black text-white min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin h-16 w-16 border-t-2 border-b-2 border-blue-600 rounded-full"></div>
      </div>
    );
  }

  // ❌ Not found
  if (!project) {
    return (
      <div className="bg-black text-white min-h-screen pt-24 text-center">
        <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
        <button
          onClick={() => navigate('/portfolio')}
          className="bg-blue-600 px-6 py-3 rounded-full"
        >
          Back to Portfolio
        </button>
      </div>
    );
  }

  
  const media: MediaItem[] = [
    ...(project.video_url
      ? [{ type: 'video', url: project.video_url } as MediaItem]
      : []),

    ...(project.videos || []).map(
      (v) => ({ type: 'video', url: v } as MediaItem)
    ),

    ...(project.thumbnail_url
      ? [{ type: 'image', url: project.thumbnail_url } as MediaItem]
      : []),

    ...(project.images || []).map(
      (img) => ({ type: 'image', url: img } as MediaItem)
    ),
  ];

  const openViewer = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % media.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + media.length) % media.length);
  };

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 🔙 TOP BACK */}
        <button
          onClick={() => navigate('/portfolio')}
          className="text-gray-400 hover:text-white mb-8 flex items-center"
        >
          <ArrowLeft className="mr-2" />
          Back to Portfolio
        </button>

        {/* 🧾 Title */}
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
{/* 🌐 Website Link */}
{project.external_link && (
  <a
    href={project.external_link}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full mb-6 transition"
  >
    🌐 Visit Website
  </a>
)}
        {/* 📄 Description */}
        <p className="text-gray-400 mb-10">{project.description}</p>

        {/* 🖼️ MEDIA GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {media.map((item, index) => (
            <div
              key={index}
              onClick={() => openViewer(index)}
             className="w-[300px] cursor-pointer group aspect-[4/5] bg-gray-900 rounded-xl overflow-hidden"
            >
            {item.type === 'image' ? (
  <img
    src={item.url}
    alt=""
    className="w-full h-full object-cover group-hover:scale-110 transition"
  />
) : (
  item.url.includes("youtube") ? (
    <iframe
      src={item.url}
      className="w-full h-full"
      title="video"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  ) : (
    <video
      src={item.url}
      className="w-full h-full object-cover"
      controls
    />
  )
)}
            </div>
          ))}
        </div>

        {/* 🔙 BOTTOM BACK */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate('/portfolio')}
            className="bg-gray-900 hover:bg-gray-800 px-8 py-4 rounded-full inline-flex items-center transition"
          >
            <ArrowLeft className="mr-2" />
            Back to Portfolio
          </button>
        </div>
      </div>

      {/* 🔥 LIGHTBOX */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">

          {/* ❌ Close */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 text-white"
          >
            <X size={30} />
          </button>

          {/* ⬅️ Prev */}
          <button
            onClick={prev}
            className="absolute left-6 text-white"
          >
            <ChevronLeft size={40} />
          </button>

          {/* 🎬 Content */}
          <div className="max-w-5xl w-full px-4">
            {media[currentIndex].type === 'image' ? (
  <img
    src={media[currentIndex].url}
    className="w-full max-h-[80vh] object-contain rounded-xl"
  />
) : (
  media[currentIndex].url.includes("youtube") ? (
    <iframe
      src={media[currentIndex].url}
      className="w-full max-h-[80vh] rounded-xl"
      title="video"
      frameBorder="0"
      allowFullScreen
    ></iframe>
  ) : (
    <video
      src={media[currentIndex].url}
      controls
      autoPlay
      className="w-full max-h-[80vh] rounded-xl"
    />
  )
)}
          </div>

          {/* ➡️ Next */}
          <button
            onClick={next}
            className="absolute right-6 text-white"
          >
            <ChevronRight size={40} />
          </button>
        </div>
      )}
    </div>
  );
}