import React from "react";
import { Link } from "react-router-dom";
import { Car, Smartphone, Phone, HelpCircle, Shield, FileText, Cookie } from "lucide-react";

const ICONS = { Car, Smartphone, Phone, HelpCircle, Shield, FileText, Cookie };

export default function FooterSection({ section }) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{section.title}</h3>
      <ul className="space-y-2 text-gray-400">
        {section.links.map((link, index) => {
          const IconComponent = ICONS[link.icon];
          return (
            <li key={index}>
              <Link to={link.href} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{link.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
