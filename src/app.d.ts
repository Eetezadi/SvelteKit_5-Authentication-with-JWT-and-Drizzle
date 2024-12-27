// src/app.d.ts
declare global {
	namespace App {
	  interface Locals {
		user?: {
		  id: number;
		  email: string;
		  username: string;
		}
	  }
	}
  }
  
  export {};
  