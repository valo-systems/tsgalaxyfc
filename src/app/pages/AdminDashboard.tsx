import { useState } from 'react';
import {
  LayoutDashboard, Newspaper, Calendar, Users, ShoppingBag, CreditCard,
  GraduationCap, Handshake, Image, Settings, FileText, Inbox, Plus, Edit, Trash
} from 'lucide-react';

export function AdminDashboard() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'fixtures', label: 'Fixtures', icon: Calendar },
    { id: 'players', label: 'Players', icon: Users },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'membership', label: 'Membership', icon: CreditCard },
    { id: 'academy', label: 'Academy Applications', icon: GraduationCap },
    { id: 'partners', label: 'Partners', icon: Handshake },
    { id: 'media', label: 'Media Library', icon: Image },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const dashboardStats = [
    { label: 'Upcoming Fixtures', value: '3', icon: Calendar, color: 'bg-blue-100 text-blue-600' },
    { label: 'New Memberships', value: '45', icon: CreditCard, color: 'bg-green-100 text-green-600' },
    { label: 'Shop Enquiries', value: '12', icon: ShoppingBag, color: 'bg-yellow-100 text-yellow-600' },
    { label: 'Academy Applications', value: '28', icon: GraduationCap, color: 'bg-purple-100 text-purple-600' },
    { label: 'Draft Articles', value: '5', icon: FileText, color: 'bg-red-100 text-red-600' },
    { label: 'Partner Enquiries', value: '3', icon: Handshake, color: 'bg-indigo-100 text-indigo-600' }
  ];

  const upcomingFixtures = [
    { match: 'TS Galaxy vs Opponent FC', date: 'May 17, 2026', venue: 'Mbombela Stadium', status: 'Upcoming' },
    { match: 'Away Team vs TS Galaxy', date: 'May 21, 2026', venue: 'Away Stadium', status: 'Upcoming' },
    { match: 'TS Galaxy vs Another Team', date: 'May 24, 2026', venue: 'Mbombela Stadium', status: 'Upcoming' }
  ];

  const recentArticles = [
    { title: 'Preview: TS Galaxy vs Opponent FC', category: 'Match Preview', status: 'Published', date: 'May 13, 2026' },
    { title: 'Three Players Return to Training', category: 'Squad News', status: 'Published', date: 'May 13, 2026' },
    { title: 'Academy Trials Registration Open', category: 'Club News', status: 'Published', date: 'May 12, 2026' },
    { title: 'Match Report: TS Galaxy 2-1 Opponents', category: 'Match Report', status: 'Draft', date: 'May 10, 2026' }
  ];

  const enquiries = [
    { type: 'Membership', name: 'John Supporter', status: 'New', date: 'May 13' },
    { type: 'Shop', name: 'Jane Customer', status: 'New', date: 'May 13' },
    { type: 'Academy', name: 'Parent Name', status: 'Reviewing', date: 'May 12' },
    { type: 'Partnership', name: 'Company ABC', status: 'In Discussion', date: 'May 11' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white flex-shrink-0 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">TSG</span>
            </div>
            <div>
              <h1 className="font-bold">TS Galaxy FC</h1>
              <p className="text-xs text-gray-400">Admin Panel</p>
            </div>
          </div>
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    activeMenu === item.id
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Dashboard</h2>
              <p className="text-sm text-gray-600">Welcome back, Admin</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Quick Add
              </button>
              <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors">
                <Inbox className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {dashboardStats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white rounded-lg border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-bold">{stat.value}</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-700">{stat.label}</p>
                </div>
              );
            })}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
            <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[
                { label: 'Add News', icon: Newspaper },
                { label: 'Add Fixture', icon: Calendar },
                { label: 'Add Product', icon: ShoppingBag },
                { label: 'Add Player', icon: Users },
                { label: 'View Enquiries', icon: Inbox }
              ].map((action, idx) => {
                const Icon = action.icon;
                return (
                  <button
                    key={idx}
                    className="flex flex-col items-center gap-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Icon className="w-6 h-6 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{action.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Fixture Management */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-lg">Upcoming Fixtures</h3>
                <button className="text-red-600 font-semibold text-sm hover:text-red-700">Manage</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Match</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {upcomingFixtures.map((fixture, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-sm">{fixture.match}</p>
                          <p className="text-xs text-gray-500">{fixture.venue}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{fixture.date}</td>
                        <td className="px-6 py-4">
                          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-1 rounded">
                            {fixture.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-red-600">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Content Management */}
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-lg">Recent Articles</h3>
                <button className="text-red-600 font-semibold text-sm hover:text-red-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Title</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentArticles.map((article, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-sm">{article.title}</p>
                          <p className="text-xs text-gray-500">{article.date}</p>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{article.category}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                            article.status === 'Published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="text-gray-600 hover:text-gray-900">
                              <Edit className="w-4 h-4" />
                            </button>
                            <button className="text-gray-600 hover:text-red-600">
                              <Trash className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Enquiries Inbox */}
            <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h3 className="font-bold text-lg">Recent Enquiries</h3>
                <button className="text-red-600 font-semibold text-sm hover:text-red-700">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {enquiries.map((enquiry, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <span className="inline-block bg-gray-100 text-gray-700 text-xs font-semibold px-2 py-1 rounded">
                            {enquiry.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-sm">{enquiry.name}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-block text-xs font-semibold px-2 py-1 rounded ${
                            enquiry.status === 'New'
                              ? 'bg-blue-100 text-blue-700'
                              : enquiry.status === 'Reviewing'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-purple-100 text-purple-700'
                          }`}>
                            {enquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{enquiry.date}</td>
                        <td className="px-6 py-4">
                          <button className="text-red-600 font-semibold text-sm hover:text-red-700">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
