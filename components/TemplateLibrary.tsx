'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/lib/actions/auth.action";
import {
  fetchUserTemplates,
  fetchCommunityTemplates,
  deleteTemplate,
  Template
} from "@/lib/actions/templates.action";

const TemplateLibrary = () => {
  const router = useRouter();
  const [userTemplates, setUserTemplates] = useState<Template[]>([]);
  const [communityTemplates, setCommunityTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        const user = await getCurrentUser();
        if (!user) return;

        const [userData, communityData] = await Promise.all([
          fetchUserTemplates(user.id),
          fetchCommunityTemplates(user.id),
        ]);

        setUserTemplates(userData);
        setCommunityTemplates(communityData);
      } catch (error) {
        console.error("Failed to load templates", error);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  const startInterview = (template: Template) => {
    const query = new URLSearchParams({
      role: template.role,
      type: template.type,
      amount: template.amount.toString(),
      questions: encodeURIComponent(JSON.stringify(template.questions)),
    }).toString();

    router.push(`/interview?${query}`);
  };

  const handleDelete = async (templateId: string) => {
    try {
      await deleteTemplate(templateId);
      setUserTemplates(prev => prev.filter(t => t.id !== templateId));
    } catch (error) {
      console.error("Failed to delete template:", error);
      alert("Failed to delete the template.");
    }
  };

  const renderTemplates = (
    templates: Template[],
    buttonColor: "purple" | "blue",
    showDeleteButton: boolean = false
  ) => (
    <div className="flex flex-col gap-6">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-white dark:bg-background border border-border p-5 rounded-xl shadow-sm hover:shadow-md transition-all space-y-3"
        >
          <h4 className="text-xl font-semibold text-primary">{template.role}</h4>
          <p className="text-sm text-muted-foreground">Created by: {template.creator}</p>
          <p className="text-sm text-muted-foreground">Type: {template.type} · Questions: {template.amount}</p>
          <ul className="list-disc list-inside text-sm text-foreground">
            {template.questions.slice(0, 3).map((q, i) => (
              <li key={i}>{q}</li>
            ))}
            {template.questions.length > 3 && <li>...and more</li>}
          </ul>
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => startInterview(template)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 cursor-pointer
                ${buttonColor === "purple"
                  ? "bg-purple-100 text-purple-900 hover:bg-purple-200 focus:ring-purple-300"
                  : "bg-blue-100 text-blue-900 hover:bg-blue-200 focus:ring-blue-300"
                }`}
            >
              Start Interview
            </button>

            {showDeleteButton && (
              <button
                onClick={() => handleDelete(template.id)}
                className="px-4 py-2 rounded-lg font-medium text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-300 cursor-pointer"
              >
                Delete
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) return <p className="text-center text-muted-foreground">Loading templates...</p>;

  return (
    <section className="my-12 space-y-12">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Your Templates</h2>
        {userTemplates.length
          ? renderTemplates(userTemplates, "purple", true)
          : <p className="text-muted-foreground">No templates yet.</p>}
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4 text-primary">Community Templates</h2>
        {communityTemplates.length
          ? renderTemplates(communityTemplates, "blue")
          : <p className="text-muted-foreground">No community templates found.</p>}
      </div>
    </section>
  );
};

export default TemplateLibrary;
