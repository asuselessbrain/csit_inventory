"use client";

import { useState, useEffect } from "react";
import { ITask } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, X } from "lucide-react";

interface TaskUpdateModalProps {
  task: ITask;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskSubmissionModal = ({ task, isOpen, onClose }: TaskUpdateModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    dueDate: "",
    requirements: task.requirements || [],
    referenceMaterials: task.referenceMaterials || [],
  });
  const [newRequirement, setNewRequirement] = useState("");
  const [newMaterial, setNewMaterial] = useState("");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      dueDate: new Date(task.dueDate).toISOString().slice(0, 16),
    }));
    setIsInitialized(true);
  }, [task.dueDate]);

  const handleAddRequirement = () => {
    if (newRequirement.trim()) {
      setFormData({
        ...formData,
        requirements: [...formData.requirements, newRequirement.trim()],
      });
      setNewRequirement("");
    }
  };

  const handleRemoveRequirement = (idx: number) => {
    setFormData({
      ...formData,
      requirements: formData.requirements.filter((_, i) => i !== idx),
    });
  };

  const handleAddMaterial = () => {
    if (newMaterial.trim()) {
      setFormData({
        ...formData,
        referenceMaterials: [...formData.referenceMaterials, newMaterial.trim()],
      });
      setNewMaterial("");
    }
  };

  const handleRemoveMaterial = (idx: number) => {
    setFormData({
      ...formData,
      referenceMaterials: formData.referenceMaterials.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/tasks/${task.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            dueDate: new Date(formData.dueDate),
            requirements: formData.requirements,
            referenceMaterials: formData.referenceMaterials,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to update task");
      }

      onClose();
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Edit task details for: <span className="font-semibold text-foreground">{task.title}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
              <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              disabled={isLoading}
              rows={3}
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              type="datetime-local"
              value={formData.dueDate}
              onChange={(e) =>
                setFormData({ ...formData, dueDate: e.target.value })
              }
              disabled={isLoading}
            />
          </div>

          {/* Requirements */}
          <div className="space-y-2">
            <Label>Requirements</Label>
            <div className="flex gap-2">
              <Input
                placeholder="Add a requirement..."
                value={newRequirement}
                onChange={(e) => setNewRequirement(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddRequirement();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={handleAddRequirement}
                disabled={isLoading || !newRequirement.trim()}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.requirements.length > 0 && (
              <div className="space-y-2 mt-2">
                {formData.requirements.map((req, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/30 rounded border border-slate-200 dark:border-slate-700"
                  >
                    <span className="text-sm">{req}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveRequirement(idx)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Reference Materials */}
          <div className="space-y-2">
            <Label>Reference Materials (URLs)</Label>
            <div className="flex gap-2">
              <Input
                placeholder="https://example.com/material"
                value={newMaterial}
                onChange={(e) => setNewMaterial(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddMaterial();
                  }
                }}
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={handleAddMaterial}
                disabled={isLoading || !newMaterial.trim()}
                variant="outline"
              >
                Add
              </Button>
            </div>
            {formData.referenceMaterials.length > 0 && (
              <div className="space-y-2 mt-2">
                {formData.referenceMaterials.map((material, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 bg-slate-50 dark:bg-slate-900/30 rounded border border-slate-200 dark:border-slate-700"
                  >
                    <a
                      href={material}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline truncate"
                    >
                      {material}
                    </a>
                    <button
                      type="button"
                      onClick={() => handleRemoveMaterial(idx)}
                      disabled={isLoading}
                      className="text-red-600 hover:text-red-700 dark:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? "Updating..." : "Update Task"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

