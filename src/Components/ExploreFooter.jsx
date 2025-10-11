export default function ExploreFooter() {
  return (
    <footer className="w-full border-t border-black py-10 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 text-black font-mono">
        {/* Left Section */}
        <div>
          <p className="mb-4 text-lg">
            © 2025 <span className="font-semibold">DSA Visualizer</span>.  
            Built with <span className="text-red-500">❤️</span> by <b>Ayush</b> & <b>Kashish</b>
          </p>
        </div>

        {/* Right Section */}
        <div className="grid grid-cols-2 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-3">🔗 Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Algorithms</a></li>
              <li><a href="#" className="hover:underline">Why Use Us</a></li>
              <li><a href="#" className="hover:underline">About</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-3">📬 Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:team@dsavisualizer.com" className="hover:underline">team@dsavisualizer.com</a></li>
              <li><a href="https://github.com/your-repo" target="_blank" rel="noreferrer" className="hover:underline">github.com/your-repo</a></li>
              <li><a href="https://linkedin.com/in/yourteam" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/yourteam</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
