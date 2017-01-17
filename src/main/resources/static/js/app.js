var homepageModule = angular.module('expTrackerApp', [ 'ngAnimate' ]);

var app = angular.module('app', [ 'ngSanitize' ]);

homepageModule
		.controller(
				'expTrackerController',
				function($scope, $http) {

					var urlBase = "";
					$scope.toggle = true;
					$scope.selection = [];
					$scope.selectedname;
					$scope.expdata = [];
					$scope.spent = [];
					$scope.sel = "";
					// $scope.date = new Date();
					var defaultName = "";

					$scope.findExpPerson = function() {

						var tbData = "";
						$scope.expdata = [];
						var name = document.getElementById("personselect").value;
						console.log(defaultName);
						if (name != " " && name != $scope.sel) {
							// console.log(document.getElementById("personselect").value);
							$http
									.get(
											urlBase
													+ '/exptracker/expenses/search/findBySpentBy?spentby='
													+ name)
									.success(
											function(data) {
												if (data._embedded != undefined) {
													$scope.expenses = data._embedded.expenses;
												} else {
													$scope.expenses = [];
												}
												for (var i = 0; i < $scope.expenses.length; i++) {

													$scope.expdata
															.push($scope.expenses[i]);
												}
											});
							// console.log(tbData);

						} else {
							$scope.expdata = [];

						}

						$scope.sel = name;

					};

					function findAllTasks() {
						// get all tasks and display initially
						$http
								.get(urlBase + '/exptracker/persons/')
								.success(
										function(data) {
											if (data._embedded != undefined) {
												$scope.persons = data._embedded.persons;
											} else {
												$scope.persons = [];
											}
											for (var i = 0; i < $scope.persons.length; i++) {

												$scope.selection
														.push($scope.persons[i]);
											}
											// $scope.selectedname =
											// $scope.selection[0].personName;
											defaultName = $scope.selection[0].personName;

											if (defaultName) {

												// console.log(document.getElementById("personselect").value);
												$http
														.get(
																urlBase
																		+ '/exptracker/expenses/search/findBySpentBy?spentby='
																		+ defaultName)
														.success(
																function(data) {
																	if (data._embedded != undefined) {
																		$scope.expenses = data._embedded.expenses;
																	} else {
																		$scope.expenses = [];
																	}
																	for (var i = 0; i < $scope.expenses.length; i++) {

																		$scope.expdata
																				.push($scope.expenses[i]);
																	}
																});

											}

										});

					}

					findAllTasks();

					function findAllExpense() {

						var dt = new Date();

						var month = document.getElementById("date").value;
						if (month || month == "") {
							month = dt.getMonth() + 1 + "-" + dt.getFullYear();
						}

						// console.log(document.getElementById("personselect").value);
						$http
								.get(
										urlBase
												+ '/exptracker/expenses/search/findAll?month='
												+ month)
								.success(
										function(data) {
											if (data._embedded != undefined) {
												$scope.expenses = data._embedded.expenses;
											} else {
												$scope.expdata = [];
											}
											for (var i = 0; i < $scope.expenses.length; i++) {

												$scope.expdata
														.push($scope.expenses[i]);

											}
										}).error(function(data, status) {
									console.log(data);
								});
						// console.log(tbData);

						$scope.sel = name;
					}
					;

					// findAllExpense();

					function findSpent() {
						var dt = new Date();

						var month = document.getElementById("date").value;
						if (month || month == "") {
							month = dt.getMonth() + 1 + "-" + dt.getFullYear();
						}

						// console.log(document.getElementById("personselect").value);
						$http
								.get(
										urlBase
												+ '/exptracker/spents/search/findSpent?month='
												+ month)
								.success(
										function(data) {
											if (data._embedded != undefined) {
												$scope.spents = data._embedded.spents;
											} else {
												$scope.expdata = [];
											}
											for (var i = 0; i < $scope.spents.length; i++) {

												$scope.spent
														.push($scope.spents[i]);

											}
										}).error(function(data, status) {
									console.log(data);
								});
						// console.log(tbData);

					}

					// findSpent();

					// create a blank object to handle form data.
					$scope.user = {};

					$scope.submitForm = function() {
						$scope.message = "";
						if (!document.getElementById("date").value) {
							alert("Please select a date");
							return;
						}

						var division_fact = 0;
						var division = " ";

						for (var i = 0; i < $scope.persons.length; i++) {
							division_fact = division_fact
									+ parseInt(document
											.getElementById("division"
													+ $scope.persons[i].personName).value);

							if (division != " ")
								division = division
										+ "-"
										+ document.getElementById("division"
												+ $scope.persons[i].personName).value;
							else
								division = document.getElementById("division"
										+ $scope.persons[i].personName).value;
						}
						// console.log(division);
						// console.log(division_fact);

						// var data = JSON.stringify({
						// date : document.getElementById("date").value,
						// amount : $scope.user.amount,
						// place : document.getElementById("sel").value,
						// spentBy :
						// document.getElementById("personselect").value

						// });
						var t_where = document.getElementById("sel").value;

						if (document.getElementById("sel").value == "Other")
							t_where = document.getElementById("othbox").value;

						var url = "/exptracker/expenses/search/addExpense?date="
								+ document.getElementById("date").value
								+ "&spentby="
								+ document.getElementById("personselect").value
								+ "&amount="
								+ $scope.user.amount
								+ "&where="
								+ t_where
								+ "&division="
								+ division
								+ "&divfactor=" + division_fact;

						$http
								.get(url)
								.success(
										function(data) {
											if (data == 1) {
												// $("#messagebtn").toggleClass('btn
												// btn-block btn-sucess
												// btn-lg');

												$('#messagebtn')
														.html(
																"<font color='green'><b>Expense Added Successfully</b></font>");

												window.setTimeout(function() {

													$('#messagebtn')
															.html("Add");

												}, 4000);

											} else {
												$('#alert').addClass(
														"alert alert-warning");
												$('#alert')
														.html(
																"<b>Error occured while saving expense</b>");
												window
														.setTimeout(
																function() {
																	$("#alert")
																			.fadeTo(
																					500,
																					0)
																			.slideUp(
																					500,
																					function() {
																						// $(this).remove();
																						$(
																								'#alert')
																								.html(
																										"");
																					});
																}, 4000);
											}
										})
								.error(
										function(data, status) {
											$('#alert').addClass(
													"alert alert-warning");
											$('#alert')
													.html(
															"<b>Error occured while saving expense</b>");
											window
													.setTimeout(
															function() {
																$("#alert")
																		.fadeTo(
																				500,
																				0)
																		.slideUp(
																				500,
																				function() {
																					$(
																							this)
																							.remove();
																					$(
																							'#alert')
																							.html(
																									"");
																				});
															}, 4000);
										})

						;

						// $http.post("/exptracker/expenses/", data)
						// .success(function(data, status) {
						// console.log(data);
						// $('#alert').addClass("alert alert-success");
						// $('#alert').html("<b>Expense Added
						// Successfully</b>");
						// window.setTimeout(function() {
						// $("#alert").fadeTo(500, 0).slideUp(500, function(){
						// $(this).remove();
						// });
						// }, 4000);
						// })
						// .error(function(data, status) {
						// console.log(data);
						// //$scope.hello = data;
						// })

					};

					// Added for division dropdowns
					$scope.data = {
						model : null,
						availableOptions : [ {
							id : '0',
							name : '0'
						}, {
							id : '1',
							name : '1'
						}, {
							id : '2',
							name : '2'
						}, {
							id : '3',
							name : '3'
						}, {
							id : '4',
							name : '4'
						} ],
					};

					$scope.where = {
						model : null,
						availableOptions : [ {
							id : 'Rent',
							name : 'Rent'
						}, {
							id : 'Kroger',
							name : 'Kroger'
						}, {
							id : 'Patel',
							name : 'Patel'
						}, {
							id : 'Walmart',
							name : 'Walmart'
						}, {
							id : 'Tmobile',
							name : 'Tmobile'
						}, {
							id : 'Other',
							name : 'Other'
						} ],
					};

				});