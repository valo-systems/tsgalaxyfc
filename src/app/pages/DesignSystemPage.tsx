export function DesignSystemPage() {
  return (
    <div className="pb-16">
      {/* Header */}
      <section className="bg-gradient-to-br from-gray-900 to-red-900 text-white py-12">
        <div className="container mx-auto px-4 lg:px-6">
          <h1 className="font-bold text-4xl lg:text-5xl mb-3">Design System</h1>
          <p className="text-gray-200">
            TS Galaxy FC digital platform component library and design guidelines
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-6 mt-12 space-y-16">
        {/* Color Palette */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Primary Red', value: '#DC2626', bg: 'bg-red-600' },
              { name: 'Dark Red', value: '#991B1B', bg: 'bg-red-800' },
              { name: 'Gray 900', value: '#111827', bg: 'bg-gray-900' },
              { name: 'Gray 800', value: '#1F2937', bg: 'bg-gray-800' },
              { name: 'Gray 100', value: '#F3F4F6', bg: 'bg-gray-100' },
              { name: 'White', value: '#FFFFFF', bg: 'bg-white border border-gray-200' },
              { name: 'Success Green', value: '#16A34A', bg: 'bg-green-600' },
              { name: 'Warning Yellow', value: '#FACC15', bg: 'bg-yellow-400' }
            ].map((color, idx) => (
              <div key={idx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className={`h-32 ${color.bg}`} />
                <div className="p-4">
                  <p className="font-semibold mb-1">{color.name}</p>
                  <p className="text-sm text-gray-600 font-mono">{color.value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Typography</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-2">Heading 1</p>
              <h1 className="font-bold text-5xl">The Rockets</h1>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Heading 2</p>
              <h2 className="font-bold text-4xl">Matchday starts here</h2>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Heading 3</p>
              <h3 className="font-bold text-2xl">Latest News</h3>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Body Text</p>
              <p className="text-base">
                TS Galaxy FC look to continue their winning streak this weekend as they welcome opponents to Mbombela Stadium.
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-2">Small Text</p>
              <p className="text-sm text-gray-600">
                Match kicks off at 15:00 • Mbombela Stadium
              </p>
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Buttons</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-3">Primary Button</p>
                <button className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors">
                  Primary Action
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Secondary Button</p>
                <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Secondary Action
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Ghost Button</p>
                <button className="bg-white/10 backdrop-blur text-gray-900 border border-gray-300 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                  Ghost Action
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Small Button</p>
                <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">
                  Small Action
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-3">Disabled Button</p>
                <button className="bg-gray-300 text-gray-500 px-6 py-3 rounded-lg font-semibold cursor-not-allowed" disabled>
                  Disabled
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Badges & Chips */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Badges & Chips</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex flex-wrap gap-3">
              <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full">UPCOMING</span>
              <span className="bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">LIVE</span>
              <span className="bg-gray-600 text-white text-xs font-bold px-3 py-1 rounded-full">FULL-TIME</span>
              <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">POSTPONED</span>
              <span className="bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded-full">SOLD OUT</span>
              <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">NEW</span>
              <span className="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">PUBLISHED</span>
              <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded-full">DRAFT</span>
              <span className="bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">OFFICIAL KIT</span>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Cards</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Match Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-4">Match Card</p>
              <div className="bg-gradient-to-br from-red-600 to-red-800 text-white rounded-lg p-6">
                <p className="text-sm mb-4">DStv Premiership</p>
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-sm">TSG</span>
                    </div>
                    <p className="font-bold text-sm">TS Galaxy</p>
                  </div>
                  <p className="text-2xl font-bold">VS</p>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="font-bold text-sm">OPP</span>
                    </div>
                    <p className="font-bold text-sm">Opponent</p>
                  </div>
                </div>
              </div>
            </div>

            {/* News Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-4">News Card</p>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-blue-500 to-blue-700" />
                <div className="p-4">
                  <span className="text-xs font-semibold text-red-600 uppercase">Match Preview</span>
                  <h3 className="font-bold text-sm mt-2 mb-2">Article Title</h3>
                  <p className="text-sm text-gray-600 mb-3">Article excerpt goes here...</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">2 hours ago</span>
                    <button className="text-red-600 text-sm font-semibold">Read More</button>
                  </div>
                </div>
              </div>
            </div>

            {/* Player Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-4">Player Card</p>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-500 to-purple-700 relative">
                  <div className="absolute top-3 left-3 bg-red-600 text-white w-10 h-10 rounded-full flex items-center justify-center">
                    <span className="font-bold">10</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-base mb-1">Player Name</h3>
                  <p className="text-sm text-gray-600 mb-1">Forward</p>
                  <p className="text-xs text-gray-500 mb-3">South Africa</p>
                  <button className="w-full bg-gray-900 text-white text-sm font-semibold py-2 rounded-lg">
                    View Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Product Card */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="text-sm text-gray-600 mb-4">Product Card</p>
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-red-600 to-red-800" />
                  <span className="absolute top-2 right-2 bg-yellow-400 text-black text-xs font-bold px-2 py-1 rounded">
                    NEW
                  </span>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-sm mb-1">Product Name</p>
                  <p className="text-red-600 font-bold text-lg mb-3">R899</p>
                  <button className="w-full bg-gray-900 text-white text-sm font-semibold py-2 rounded-lg">
                    View Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Form Elements</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Text Input</label>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Select Dropdown</label>
              <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Textarea</label>
              <textarea
                rows={4}
                placeholder="Enter message..."
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-red-600"
              />
            </div>
            <div>
              <label className="flex items-center gap-3">
                <input type="checkbox" className="w-5 h-5" />
                <span className="text-sm">Checkbox option</span>
              </label>
            </div>
          </div>
        </section>

        {/* Icons & Spacing */}
        <section>
          <h2 className="font-bold text-3xl mb-6">Spacing Scale</h2>
          <div className="bg-white rounded-lg border border-gray-200 p-8 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">4px</div>
              <div className="h-4 bg-red-600 w-4" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">8px</div>
              <div className="h-4 bg-red-600 w-8" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">12px</div>
              <div className="h-4 bg-red-600 w-12" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">16px</div>
              <div className="h-4 bg-red-600 w-16" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">24px</div>
              <div className="h-4 bg-red-600 w-24" />
            </div>
            <div className="flex items-center gap-4">
              <div className="w-16 text-sm text-gray-600">32px</div>
              <div className="h-4 bg-red-600 w-32" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
