---
inject: true
to: "./controllers/<%= name %>Controller.js"
after:
---
exports.<%= fun %> = catchAsync(async (req, res, next) => {
res.status(200).json({
     status: 'success',
})
}