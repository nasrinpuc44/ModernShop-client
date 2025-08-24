"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, X, Plus } from "lucide-react";

export function AddProductForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    originalPrice: "",
    category: "",
    brand: "",
    inStock: "",
    features: [],
    specifications: {},
  });

  const [currentFeature, setCurrentFeature] = useState("");
  const [currentSpecKey, setCurrentSpecKey] = useState("");
  const [currentSpecValue, setCurrentSpecValue] = useState("");

  const categories = [
    "Electronics",
    "Fashion",
    "Home",
    "Sports",
    "Books",
    "Beauty",
    "Automotive",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addFeature = () => {
    if (
      currentFeature.trim() &&
      !formData.features.includes(currentFeature.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, currentFeature.trim()],
      }));
      setCurrentFeature("");
    }
  };

  const removeFeature = (index) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const addSpecification = () => {
    if (currentSpecKey.trim() && currentSpecValue.trim()) {
      setFormData((prev) => ({
        ...prev,
        specifications: {
          ...prev.specifications,
          [currentSpecKey.trim()]: currentSpecValue.trim(),
        },
      }));
      setCurrentSpecKey("");
      setCurrentSpecValue("");
    }
  };

  const removeSpecification = (key) => {
    setFormData((prev) => {
      const newSpecs = { ...prev.specifications };
      delete newSpecs[key];
      return {
        ...prev,
        specifications: newSpecs,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    // Basic validation
    if (
      !formData.name ||
      !formData.description ||
      !formData.price ||
      !formData.category
    ) {
      setError("Please fill in all required fields");
      setIsSubmitting(false);
      return;
    }

    if (Number.parseFloat(formData.price) <= 0) {
      setError("Price must be greater than 0");
      setIsSubmitting(false);
      return;
    }

    if (
      formData.originalPrice &&
      Number.parseFloat(formData.originalPrice) <=
        Number.parseFloat(formData.price)
    ) {
      setError("Original price must be greater than current price");
      setIsSubmitting(false);
      return;
    }

    try {
      // Simulate API call

      // In a real app, you would send the data to your API
      const res = await fetch("https://nextserver-black.vercel.app/product", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(res);

      setShowSuccess(true);

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setFormData({
          name: "",
          image: "",
          description: "",
          price: "",
          originalPrice: "",
          category: "",
          brand: "",
          stockCount: "",
          features: [],
          specifications: {},
        });
        router.push("/products");
      }, 3000);
    } catch (err) {
      setError("Failed to add product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showSuccess) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950 dark:border-green-800">
        <CardContent className="p-8">
          <div className="text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 dark:text-green-200 mb-2">
              Product Added Successfully!
            </h2>
            <p className="text-green-700 dark:text-green-300 mb-4">
              Your product "{formData.name}" has been added to the catalog.
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Redirecting to products page...
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Information</CardTitle>
        <CardDescription>
          Enter the details for your new product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Product Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) => handleInputChange("brand", e.target.value)}
                placeholder="Enter brand name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              Product Image <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={formData.image}
              onChange={(e) => handleInputChange("image", e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">
              Description <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter detailed product description"
              rows={4}
              required
            />
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">
                Price <span className="text-red-500">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={formData.price}
                onChange={(e) => handleInputChange("price", e.target.value)}
                placeholder="0.00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price (Optional)</Label>
              <Input
                id="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={(e) =>
                  handleInputChange("originalPrice", e.target.value)
                }
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stockCount">Stock Quantity</Label>
              <Input
                id="stockCount"
                type="number"
                min="0"
                value={formData.inStock}
                onChange={(e) => handleInputChange("inStock", e.target.value)}
                placeholder="0"
              />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleInputChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <Label>Product Features</Label>
            <div className="flex gap-2">
              <Input
                value={currentFeature}
                onChange={(e) => setCurrentFeature(e.target.value)}
                placeholder="Add a feature"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addFeature())
                }
              />
              <Button type="button" onClick={addFeature} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.features.map((feature, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Specifications */}
          <div className="space-y-4">
            <Label>Specifications</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
              <Input
                value={currentSpecKey}
                onChange={(e) => setCurrentSpecKey(e.target.value)}
                placeholder="Specification name"
              />
              <Input
                value={currentSpecValue}
                onChange={(e) => setCurrentSpecValue(e.target.value)}
                placeholder="Specification value"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addSpecification())
                }
              />
              <Button type="button" onClick={addSpecification} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {Object.keys(formData.specifications).length > 0 && (
              <div className="space-y-2">
                {Object.entries(formData.specifications).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <span className="text-sm">
                      <strong>{key}:</strong> {value}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSpecification(key)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? "Adding Product..." : "Add Product"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/products")}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
