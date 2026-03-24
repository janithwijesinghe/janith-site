import { useEffect, useState } from 'react';
import { supabase, type Project } from '../lib/supabase';
import ProjectCard from '../components/ProjectCard';

const categories = ['All', 'Social Media', '2D Animation', 'AI Video', 'Web Development'];

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

 useEffect(() => {
  if (selectedCategory === 'All') {
    setFilteredProjects(projects);
  } else {
    setFilteredProjects(
      projects.filter(p => {
        if (selectedCategory === 'Social Media')
          return p.category === '70b16a0e-0825-40d3-a990-af02f3d52640';

        if (selectedCategory === '2D Animation')
          return p.category === 'e11249f7-3034-4fca-99fd-565fc655ef41';

        if (selectedCategory === 'AI Video')
          return p.category === '60566d26-3b56-4de9-995e-2a68fe70df7a';

        if (selectedCategory === 'Web Development')
          return p.category === '165fca21-91d7-4e33-a9b4-260f9cea2856';

        return false;
      })
    );
  }
}, [selectedCategory, projects]);

const fetchProjects = async () => {
  setLoading(true);

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  console.log("DATA:", data);

  setProjects(data || []);
  setFilteredProjects(data || []);

  setLoading(false);
};

  return (
    <div className="bg-black text-white min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-gray-400 text-lg">
            Explore my creative work across different categories
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all transform hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-900 text-gray-400 hover:bg-gray-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No projects found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
