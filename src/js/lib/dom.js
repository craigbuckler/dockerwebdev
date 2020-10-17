// DOM library

// get element by ID
export function id(id, doc = document) {
  return doc.getElementById(id);
}

// get element by className
export function cn(cn, doc = document) {
  return doc.getElementsByClassName(cn);
}
