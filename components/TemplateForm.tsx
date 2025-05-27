'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const defaultQuestion = '';

const TemplateForm = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    role: '',
    type: 'technical',
    amount: 5,
    questions: [defaultQuestion],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: name === 'amount' ? Number(value) : value }));
  };

  const handleQuestionChange = (index: number, value: string) => {
    const updatedQuestions = [...form.questions];
    updatedQuestions[index] = value;
    setForm((prev) => ({ ...prev, questions: updatedQuestions }));
  };

  const addQuestion = () => {
    setForm((prev) => ({ ...prev, questions: [...prev.questions, ''] }));
  };

  const removeQuestion = (index: number) => {
    const updated = form.questions.filter((_, i) => i !== index);
    setForm((prev) => ({ ...prev, questions: updated }));
  };

  const handleStartInterview = () => {
    if (!form.role.trim()) {
      alert("Please enter a role.");
      return;
    }

    if (form.amount < 1 || form.amount > 20) {
      alert("Please enter a valid number of questions (1–20).");
      return;
    }

    const nonEmptyQuestions = form.questions.filter(q => q.trim() !== '');
   
    const query = new URLSearchParams({
      role: form.role,
      type: form.type,
      amount: form.amount.toString(),
      questions: JSON.stringify(nonEmptyQuestions),
    }).toString();

    router.push(`/interview?${query}`);
  };

      const handleSaveTemplate = async () => {
      if (!form.role.trim()) {
        alert("Please enter a role before saving the template.");
        return;
      }

      const nonEmptyQuestions = form.questions.filter(q => q.trim() !== '');

      if (nonEmptyQuestions.length === 0) {
        alert("You must add at least one question to save the template.");
        return;
      }

      try {
        const res = await fetch('/api/vapi/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...form,
            questions: nonEmptyQuestions,
          }),
        });

        const data = await res.json();
        if (data.success) {
          alert('Template saved successfully!');
          setForm({
            role: '',
            type: 'technical',
            amount: 5,
            questions: [defaultQuestion],
          });
        } else {
          alert('Failed to save template.');
        }
      } catch (error) {
        console.error('Client-side error:', error);
        alert('Failed to save template.');
      }
    };

  return (
    <div className="template-form-wrapper">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-xl mx-auto p-6 bg-card rounded-lg shadow-md border border-border space-y-6"
      >
        <h2 className="text-2xl font-semibold text-primary">Create Interview Template</h2>

        <div>
          <label htmlFor="role" className="block font-medium text-light-100 mb-1">Role</label>
          <input
            id="role"
            name="role"
            type="text"
            value={form.role}
            onChange={handleChange}
            placeholder="e.g., Frontend Developer"
            className="w-full p-2 rounded bg-background border border-border"
            required
          />
        </div>

        <div>
          <label htmlFor="type" className="block font-medium text-light-100 mb-1">Interview Type</label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full p-2 rounded bg-background border border-border cursor-pointer"
          >
            <option value="technical">Technical</option>
            <option value="behavioral">Behavioral</option>
            <option value="mixed">Mixed</option>
          </select>
        </div>

        <div>
          <label htmlFor="amount" className="block font-medium text-light-100 mb-1">Number of Questions</label>
          <input
            id="amount"
            name="amount"
            type="number"
            min={1}
            max={20}
            value={form.amount}
            onChange={handleChange}
            className="w-full p-2 rounded bg-background border border-border"
            required
          />
        </div>

  
        <div>
          <label className="block font-medium text-light-100 mb-1">Custom Questions (optional)</label>
          {form.questions.map((q, i) => (
            <div key={i} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={q}
                onChange={(e) => handleQuestionChange(i, e.target.value)}
                placeholder={`Question ${i + 1}`}
                className="flex-grow p-2 rounded bg-background border border-border"
                required
              />
              {form.questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(i)}
                  className="text-red-500 hover:text-red-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addQuestion}
            className="text-sm text-purple-700 mt-1 hover:underline cursor-pointer"
          >
            + Add another question
          </button>
        </div>

        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            onClick={handleSaveTemplate}
            className="bg-blue-100 text-blue-800 px-4 py-2 rounded hover:bg-blue-200 font-medium cursor-pointer"
          >
            Create Template
          </button>
          <button
            type="button"
            onClick={handleStartInterview}
            className="bg-purple-200 text-purple-900 px-4 py-2 rounded hover:bg-purple-300 font-medium cursor-pointer"
          >
            Start Interview
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemplateForm;
