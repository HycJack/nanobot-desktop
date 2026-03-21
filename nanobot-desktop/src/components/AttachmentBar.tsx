import React from "react";
import { Attachment } from "../types";
import { FileText, Image as ImageIcon, X } from "lucide-react";

interface AttachmentBarProps {
  attachments: Attachment[];
  onRemove: (id: string) => void;
}

export default function AttachmentBar({ attachments, onRemove }: AttachmentBarProps) {
  if (attachments.length === 0) return null;

  return (
    <div className="attachments-bar">
      {attachments.map((file) => (
        <div key={file.id} className="attachment-pill">
          {file.previewUrl ? (
            <img src={file.previewUrl} alt={file.name} className="attachment-preview" />
          ) : (
            <div className="attachment-icon">
              <FileText size={16} />
            </div>
          )}
          <span className="attachment-name">{file.name}</span>
          <button
            className="attachment-remove"
            onClick={() => onRemove(file.id)}
            aria-label={`Remove ${file.name}`}
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}
