import { Link } from 'react-router-dom';
import { ExternalLink, Play } from 'lucide-react';
import type { Project } from '../lib/supabase';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={project.thumbnail_url}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {project.video_url && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="bg-blue-600 rounded-full p-4">
              <Play size={24} className="text-white" fill="white" />
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          {project.external_link && (
            <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-400 transition-colors flex-shrink-0 ml-2" />
          )}
        </div>

        <p className="text-sm text-blue-400 mb-3">
  {project.category_name} 
</p>

        <p className="text-gray-400 text-sm line-clamp-2">
          {project.description}
        </p>
      </div>
    </Link>
  );
}
