import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  saveData: (type: string, data: any) => Promise<void>;
  getData: (type: string) => any[];
  uploadImage: (file: File) => Promise<string>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const ADMIN_PASSWORD = "admin123"; // Simple placeholder auth

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dataCache, setDataCache] = useState<Record<string, any[]>>({});

  useEffect(() => {
    const authStatus = localStorage.getItem("admin_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem("admin_auth", "true");
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("admin_auth");
  };

  const saveData = async (type: string, data: any) => {
    try {
      // In a real app, this would make an API call
      // For now, we'll store in localStorage and update cache
      const currentData = getData(type);
      const newData = Array.isArray(data) ? data : [...currentData, data];
      
      localStorage.setItem(`admin_${type}`, JSON.stringify(newData));
      setDataCache(prev => ({ ...prev, [type]: newData }));
      
      toast.success("Changes saved successfully!");
    } catch (error) {
      toast.error("Failed to save changes");
      throw error;
    }
  };

  const getData = (type: string) => {
    // Always check localStorage first for persistence
    const stored = localStorage.getItem(`admin_${type}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed;
      } catch (error) {
        console.error(`Error parsing ${type} from localStorage:`, error);
      }
    }

    // If no localStorage data, check cache
    if (dataCache[type]) {
      return dataCache[type];
    }

    // Load from static JSON files as last fallback
    let defaultData: any[] = [];
    try {
      switch (type) {
        case "blogs":
          defaultData = require("@/data/blogs.json");
          break;
        case "caseStudies":
          defaultData = require("@/data/caseStudies.json");
          break;
        case "services":
          defaultData = require("@/data/services.json");
          break;
        case "products":
          defaultData = require("@/data/products.json");
          break;
        case "careers":
          defaultData = require("@/data/careers.json");
          break;
        case "team":
          defaultData = require("@/data/team.json");
          break;
        case "clients":
          defaultData = require("@/data/clients.json");
          break;
      }
    } catch {
      defaultData = [];
    }

    setDataCache(prev => ({ ...prev, [type]: defaultData }));
    return defaultData;
  };

  const uploadImage = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64 = reader.result as string;
          const timestamp = Date.now();
          const fileName = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "-")}`;
          
          // Store in localStorage (in production, upload to server)
          const images = JSON.parse(localStorage.getItem("admin_images") || "{}");
          images[fileName] = base64;
          localStorage.setItem("admin_images", JSON.stringify(images));
          
          resolve(`/uploads/${fileName}`);
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsDataURL(file);
      } catch (error) {
        reject(error);
      }
    });
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        saveData,
        getData,
        uploadImage,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within AdminProvider");
  }
  return context;
}
