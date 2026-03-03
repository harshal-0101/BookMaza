'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  User, Mail, Phone, MapPin, BookOpen, Edit3, Camera,
  Globe, Twitter, Instagram, Linkedin, Calendar,
  Award, TrendingUp, FileText, Check, X,
} from 'lucide-react';
import Sidebar from '../../../../../components/Application/Author/sidebar';
import Header  from '../../../../../components/Application/Author/header';
import { useAppContext } from '../../../../../components/Application/Author/RoyaltiesContext';

// ── Mock local profile data (fields NOT in sidebar context) ──────────────────
const initialLocalData = {
  phone:     '+91 98765 43210',
  location:  'Mumbai, Maharashtra',
  bio:       'Award-winning author of contemporary fiction and self-help literature. With over a decade of writing experience, I craft stories that resonate with readers across India and beyond. My work focuses on mindfulness, modern minimalism, and the human connection.',
  website:   'www.arjunmehta.in',
  twitter:   '@arjunwrites',
  instagram: '@arjunmehta_author',
  linkedin:  'linkedin.com/in/arjunmehta',
  joinedOn:  'March 2021',
  genre:     'Contemporary Fiction, Self-Help',
  language:  'English, Hindi',
};

function EditableField({ value, onChange, multiline = false, className = '' }) {
  if (multiline) {
    return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={5}
        className={`w-full border border-emerald-300 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 resize-none ${className}`}
      />
    );
  }
  return (
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full border border-emerald-300 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${className}`}
    />
  );
}

function InfoRow({ icon: Icon, label, value, editing, onChange }) {
  return (
    <div className="flex items-start gap-3 py-3.5 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0 mt-0.5">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        {editing
          ? <EditableField value={value} onChange={onChange} />
          : <p className="text-sm font-semibold text-gray-800 break-words">{value}</p>
        }
      </div>
    </div>
  );
}

function SocialRow({ icon: Icon, label, value, color }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-gray-50">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <div className="min-w-0">
        <p className="text-xs text-gray-400 font-medium mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-gray-700 truncate">{value}</p>
      </div>
    </div>
  );
}

function EditActions({ onSave, onCancel }) {
  return (
    <div className="flex items-center gap-2">
      <button onClick={onSave} className="flex items-center gap-1 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 px-2.5 py-1.5 rounded-lg transition-colors">
        <Check className="w-3 h-3" /> Save
      </button>
      <button onClick={onCancel} className="flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 px-2.5 py-1.5 rounded-lg transition-colors">
        <X className="w-3 h-3" /> Cancel
      </button>
    </div>
  );
}

export default function ViewProfilePage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // ── Shared context (name, email, avatar synced with sidebar) ─────────────
  const { authorProfile, updateAuthorProfile } = useAppContext();
  const { name, email, avatar } = authorProfile;

  // ── Local profile data (not needed in sidebar) ────────────────────────────
  const [local, setLocal] = useState(initialLocalData);

  const fileRef = useRef(null);

  // ── Avatar card edit ──────────────────────────────────────────────────────
  const [avatarEditing, setAvatarEditing] = useState(false);
  const [avatarDraft, setAvatarDraft]     = useState({ name, email });

  const startAvatarEdit = () => { setAvatarDraft({ name, email }); setAvatarEditing(true); };
  const saveAvatarEdit  = () => {
    updateAuthorProfile({ name: avatarDraft.name, email: avatarDraft.email }); // ✅ syncs sidebar
    setAvatarEditing(false);
  };
  const cancelAvatarEdit = () => setAvatarEditing(false);

  // ── Personal info edit ────────────────────────────────────────────────────
  const [infoEditing, setInfoEditing] = useState(false);
  const [infoDraft, setInfoDraft]     = useState({ name, email, ...local });

  const startInfoEdit = () => { setInfoDraft({ name, email, ...local }); setInfoEditing(true); };
  const saveInfoEdit  = () => {
    const { name: n, email: e, ...rest } = infoDraft;
    updateAuthorProfile({ name: n, email: e }); // ✅ syncs sidebar
    setLocal(prev => ({ ...prev, ...rest }));
    setInfoEditing(false);
  };
  const cancelInfoEdit = () => setInfoEditing(false);
  const updateInfoDraft = (key) => (val) => setInfoDraft(d => ({ ...d, [key]: val }));

  // ── Bio edit ──────────────────────────────────────────────────────────────
  const [bioEditing, setBioEditing] = useState(false);
  const [bioDraft, setBioDraft]     = useState(local.bio);

  const startBioEdit  = () => { setBioDraft(local.bio); setBioEditing(true); };
  const saveBioEdit   = () => { setLocal(p => ({ ...p, bio: bioDraft })); setBioEditing(false); };
  const cancelBioEdit = () => setBioEditing(false);

  // ── Social & Web edit ─────────────────────────────────────────────────────
  const [socialEditing, setSocialEditing] = useState(false);
  const [socialDraft, setSocialDraft] = useState({
    website: local.website,
    twitter: local.twitter,
    instagram: local.instagram,
    linkedin: local.linkedin,
  });

  const startSocialEdit = () => {
    setSocialDraft({
      website: local.website,
      twitter: local.twitter,
      instagram: local.instagram,
      linkedin: local.linkedin,
    });
    setSocialEditing(true);
  };
  const saveSocialEdit = () => {
    setLocal(prev => ({
      ...prev,
      website: socialDraft.website,
      twitter: socialDraft.twitter,
      instagram: socialDraft.instagram,
      linkedin: socialDraft.linkedin,
    }));
    setSocialEditing(false);
  };
  const cancelSocialEdit = () => setSocialEditing(false);
  const updateSocialDraft = (key) => (val) => setSocialDraft(d => ({ ...d, [key]: val }));

  // ── Avatar photo change ───────────────────────────────────────────────────
  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    updateAuthorProfile({ avatar: url }); // ✅ syncs sidebar avatar instantly
  };

  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50">

      <Sidebar isSidebarOpen={isSidebarOpen} onLogout={() => router.push('/login')} />

      <main className="flex-1 overflow-auto">
        <Header
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          title="My Profile"
        />

        <div className="p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">My Profile</h2>
            <p className="text-sm text-gray-400 mt-0.5">View and manage your author information</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-6">

              {/* Avatar card */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center ring-4 ring-white shadow-md">
                    {avatar ? (
                      <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-3xl font-extrabold text-blue-600">{initials}</span>
                    )}
                  </div>
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center shadow-md transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </div>

                {avatarEditing ? (
                  <div className="w-full space-y-2 mb-2">
                    <div className="text-left">
                      <label className="text-xs text-gray-400 font-medium">Name</label>
                      <EditableField value={avatarDraft.name}  onChange={v => setAvatarDraft(d => ({ ...d, name: v }))}  className="mt-0.5" />
                    </div>
                    <div className="text-left">
                      <label className="text-xs text-gray-400 font-medium">Email</label>
                      <EditableField value={avatarDraft.email} onChange={v => setAvatarDraft(d => ({ ...d, email: v }))} className="mt-0.5" />
                    </div>
                    <div className="flex justify-center pt-1">
                      <EditActions onSave={saveAvatarEdit} onCancel={cancelAvatarEdit} />
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg font-extrabold text-gray-900">{name}</h3>
                    <p className="text-sm text-gray-400 mt-0.5">{email}</p>
                  </>
                )}

                {!avatarEditing && (
                  <button
                    onClick={startAvatarEdit}
                    className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-sm font-semibold rounded-xl transition-all shadow-sm"
                  >
                    <Edit3 className="w-4 h-4" /> Edit Profile
                  </button>
                )}
              </div>

              {/* Social links */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-700">Social & Web</h4>
                    <p className="text-xs text-gray-400">Your public links</p>
                  </div>
                  {socialEditing ? (
                    <EditActions onSave={saveSocialEdit} onCancel={cancelSocialEdit} />
                  ) : (
                    <button
                      onClick={startSocialEdit}
                      className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Edit
                    </button>
                  )}
                </div>

                {socialEditing ? (
                  // Editable version
                  <div className="space-y-1">
                    {/* Website */}
                    <div className="flex items-start gap-3 py-3 border-b border-gray-50">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Globe className="w-4 h-4 text-gray-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Website</p>
                        <EditableField value={socialDraft.website} onChange={updateSocialDraft('website')} />
                      </div>
                    </div>
                    {/* Twitter */}
                    <div className="flex items-start gap-3 py-3 border-b border-gray-50">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Twitter className="w-4 h-4 text-sky-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Twitter</p>
                        <EditableField value={socialDraft.twitter} onChange={updateSocialDraft('twitter')} />
                      </div>
                    </div>
                    {/* Instagram */}
                    <div className="flex items-start gap-3 py-3 border-b border-gray-50">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Instagram className="w-4 h-4 text-pink-500" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 font-medium mb-0.5">Instagram</p>
                        <EditableField value={socialDraft.instagram} onChange={updateSocialDraft('instagram')} />
                      </div>
                    </div>
                    {/* LinkedIn */}
                    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
                      <div className="w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center flex-shrink-0">
                        <Linkedin className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs text-gray-400 font-medium mb-0.5">LinkedIn</p>
                        <EditableField value={socialDraft.linkedin} onChange={updateSocialDraft('linkedin')} />
                      </div>
                    </div>
                  </div>
                ) : (
                  // Static view
                  <>
                    <SocialRow icon={Globe}     label="Website"   value={local.website}   color="text-gray-500" />
                    <SocialRow icon={Twitter}   label="Twitter"   value={local.twitter}   color="text-sky-500"  />
                    <SocialRow icon={Instagram} label="Instagram" value={local.instagram} color="text-pink-500" />
                    <SocialRow icon={Linkedin}  label="LinkedIn"  value={local.linkedin}  color="text-blue-600" />
                  </>
                )}
              </div>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="lg:col-span-2 flex flex-col gap-6">

              {/* Personal info */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-700">Personal Information</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Your account details</p>
                  </div>
                  {infoEditing
                    ? <EditActions onSave={saveInfoEdit} onCancel={cancelInfoEdit} />
                    : <button onClick={startInfoEdit} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                  }
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  <div>
                    <InfoRow icon={User}   label="Full Name" value={infoEditing ? infoDraft.name     : name}           editing={infoEditing} onChange={updateInfoDraft('name')}     />
                    <InfoRow icon={Mail}   label="Email"     value={infoEditing ? infoDraft.email    : email}          editing={infoEditing} onChange={updateInfoDraft('email')}    />
                    <InfoRow icon={Phone}  label="Phone"     value={infoEditing ? infoDraft.phone    : local.phone}    editing={infoEditing} onChange={updateInfoDraft('phone')}    />
                    <InfoRow icon={MapPin} label="Location"  value={infoEditing ? infoDraft.location : local.location} editing={infoEditing} onChange={updateInfoDraft('location')} />
                  </div>
                  <div>
                    <InfoRow icon={BookOpen} label="Genre"        value={infoEditing ? infoDraft.genre    : local.genre}    editing={infoEditing} onChange={updateInfoDraft('genre')}    />
                    <InfoRow icon={Globe}    label="Language"     value={infoEditing ? infoDraft.language : local.language} editing={infoEditing} onChange={updateInfoDraft('language')} />
                    <InfoRow icon={Calendar} label="Member Since" value={local.joinedOn} editing={false} onChange={() => {}} />
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-extrabold text-gray-700">About Me</h4>
                    <p className="text-xs text-gray-400 mt-0.5">Your public author bio</p>
                  </div>
                  {bioEditing
                    ? <EditActions onSave={saveBioEdit} onCancel={cancelBioEdit} />
                    : <button onClick={startBioEdit} className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"><Edit3 className="w-3.5 h-3.5" />Edit</button>
                  }
                </div>
                {bioEditing
                  ? <EditableField value={bioDraft} onChange={setBioDraft} multiline />
                  : <p className="text-sm text-gray-600 leading-relaxed">{local.bio}</p>
                }
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}