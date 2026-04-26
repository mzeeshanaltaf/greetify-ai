```markdown
Quick Start:

```javascript
import { put } from "@vercel/blob";

const { url } = await put('articles/blob.txt', 'Hello World!', { access: 'public' });
```

Getting Started

Get started using this Blob Storage by following the below steps:

1. Prepare your local project

Run `vercel link` and `vercel env pull` in your terminal so you have the latest environment variables for your project locally.

2. Install our package

Then run `npm install @vercel/blob` to install the Vercel Blob SDK.



