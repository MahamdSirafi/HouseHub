---
inject: true
to: "./routes/<%= name %>Routes.js"
---
router.route("/<%=   path %>").<%=   method %>( 
restrictTo(<%=   role %>),
<%= name %>Controller.<%= fun %>)