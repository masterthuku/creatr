"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";

const CATEGORIES = [
  "Technology",
  "Design",
  "Marketing",
  "Business",
  "Lifestyle",
  "Education",
  "Health",
  "Travel",
  "Food",
  "Entertainment",
];

const PostEditorSettings = ({ isOpen, onClose, form, mode }) => {
  const [tagInput, setagInput] = useState("");
  const { watch, setValue } = form;
  const watchedValues = watch();

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (
      tag &&
      !watchedValues.tags.includes(tag) &&
      watchedValues.tags.length < 10
    ) {
      setValue("tags", [...watchedValues.tags, tag]);
      setagInput("");
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const removeTag = (tagToRemove) => {
    setValue(
      "tags",
      watchedValues.tags.filter((tag) => tag !== tagToRemove)
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={"max-w-md"}>
        <DialogHeader>
          <DialogTitle>Post Settings</DialogTitle>
          <DialogDescription>Configure your post details</DialogDescription>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <Select
              value={watchedValues.category}
              onValueChange={(value) => setValue("category", value)}
            >
              <SelectTrigger className={"bg-slate-800 border-slate-600"}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-3">
            <label className="text-white text-sm font-medium">Tags</label>
            <div className="flex space-x-2">
              <Input
                value={tagInput}
                onChange={(e) => setagInput(e.target.value)}
                onKeyDown={handleTagInput}
                placeholder="Add a tag"
                className={"bg-slate-800 border-slate-600"}
              />
              <Button
                type="button"
                onClick={addTag}
                variant={"outline"}
                size={"sm"}
                className={"border-slate-600"}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {watchedValues.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {watchedValues.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    variant={"secondary"}
                    className={
                      "bg-purple-500/20 text-purple-300 border-purple-500/30"
                    }
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 hover:text-red-400"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-400">
            {watchedValues.tags.length}/10 tags added. Press Enter or comma to
            add
          </p>
        </div>
        {mode === "create" && (
          <div className="space-y-2">
            <Label className={"text-white text-sm font-medium"}>
              Schedule Publication Date
            </Label>
            <Input
              value={watchedValues.scheduledFor}
              onChange={(e) => setValue("scheduledFor", e.target.value)}
              type={"datetime-local"}
              className={"bg-slate-800 border-slate-600"}
              min={new Date().toISOString().slice(0, 16)}
            />
            <p className="text-xs text-slate-400">
              Leave empty to publish immediately
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostEditorSettings;
