"use client";

import { Component, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center px-6">
            <span className="text-4xl">⚠️</span>
            <h3 className="font-serif text-xl text-near-black">出了点小问题</h3>
            <p className="text-sm text-stone-gray max-w-md">
              页面加载遇到了意外错误，请刷新页面重试。
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-2 px-6 py-2 bg-terracotta text-ivory rounded-lg text-sm font-medium hover:bg-coral transition-colors"
            >
              刷新页面
            </button>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
