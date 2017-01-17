var taskManagerModule = angular.module('expTrackerApp', [ 'ngAnimate' ]);

taskManagerModule
		.controller(
				'expTrackerController',
				function($scope, $http, $rootScope) {
					$scope.datetest = document.getElementById("date").value;
					var label = "";
					var data = [];
					var spents = [];
					var pieOptions = {
						// Boolean - Whether we should show a stroke on each
						// segment
						segmentShowStroke : true,
						// String - The colour of each segment stroke
						segmentStrokeColor : "#fff",
						// Number - The width of each segment stroke
						segmentStrokeWidth : 1,
						// Number - The percentage of the chart that we cut out
						// of the middle
						percentageInnerCutout : 50, // This is 0 for Pie charts
						// Number - Amount of animation steps
						animationSteps : 100,
						// String - Animation easing effect
						animationEasing : "easeOutBounce",
						// Boolean - Whether we animate the rotation of the
						// Doughnut
						animateRotate : true,
						// Boolean - Whether we animate scaling the Doughnut
						// from the centre
						animateScale : false,
						// Boolean - whether to make the chart responsive to
						// window resizing
						responsive : true,
						// Boolean - whether to maintain the starting aspect
						// ratio or not when responsive, if set to false, will
						// take up entire container
						maintainAspectRatio : false,
						// String - A legend template
						legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>",
						// String - A tooltip template
						tooltipTemplate : "<%=value %> <%=label%>"
					};
					var urlBase = "";
					$scope.toggle = true;
					$scope.selection = [];
					// $scope.expdata =[];
					// $scope.spent =[];
					$scope.sel = "";
					$scope.color = [ "#f56954", "#00a65a", "#f39c12",
							"#00c0ef", "#3c8dbc", "#d2d6de" ]
					$scope.total = 0;
					// $scope.tableParams;

					// function findAllTasks() {
					// //get all tasks and display initially
					// $http.get(urlBase + '/exptracker/persons/').
					// success(function (data) {
					// if (data._embedded != undefined) {
					// $scope.persons = data._embedded.persons;
					// } else {
					// $scope.persons = [];
					// }
					// for (var i = 0; i < $scope.persons.length; i++) {

					// $scope.selection.push($scope.persons[i]);
					// }
					// $scope.taskName="";
					// $scope.taskDesc="";
					// $scope.taskPriority="";
					// $scope.taskStatus="";
					// $scope.toggle='!toggle';
					// });
					// }

					// findAllTasks();

					// $scope.findExpPerson = function()
					// {

					// var tbData = "";

					// var name = document.getElementById("personselect").value;
					// if(name!=" " && name != $scope.sel)
					// {
					// //console.log(document.getElementById("personselect").value);
					// $http.get(urlBase +
					// '/exptracker/expenses/search/findBySpentBy?spentby='+name).
					// success(function (data) {
					// if (data._embedded != undefined) {
					// $scope.expenses = data._embedded.expenses;
					// } else {
					// $scope.expdata = [];
					// }
					// for (var i = 0; i < $scope.expenses.length; i++) {

					// $scope.expdata.push($scope.expenses[i]);
					// // tbData = "<tr><td>"+$scope.expenses[i].date+"</td>" +
					// // "<td>"+$scope.expenses[i].spentBy+"</td>" +
					// // "<td>"+$scope.expenses[i].amount+"</td>" +
					// // "<td>"+$scope.expenses[i].place+"</td></tr>";
					// // document.getElementById("table1").innerHTML =
					// document.getElementById("table1").innerHTML+tbData;
					// }
					// });
					// // console.log(tbData);

					// }
					// else
					// {
					// $scope.expdata = [];

					// }

					// $scope.sel = name;

					// };

					function findAllExpense() {

						$scope.expdata = [];
						var dt = new Date();

						var month = document.getElementById("date").value;

						if (!month || month == "") {
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
						// var self= this;
						// self.tableParams = new NgTableParams({}, { data:
						// $scope.expdata});

						// $scope.sel = name;

					}
					;

					function findSpent() {

						var dt = new Date();
						var PieData = [];

						var month = document.getElementById("date").value;
						if (!month || month == "") {
							month = dt.getMonth() + 1 + "-" + dt.getFullYear();
						}

						$('#pieChart').remove(); // this is my <canvas>
													// element
						$('#graph-container')
								.append(
										'<canvas id="pieChart" class="chart chart-doughnut"></canvas>');

						var pieChartCanvas = $("#pieChart").get(0).getContext(
								"2d");
						var pieChart = new Chart(pieChartCanvas);
						spents = [];
						$scope.total = 0;
						// pieChartCanvas = null;
						// pieChart = null;
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
												$scope.spents = [];
											}

											
											
											for (var i = 0; i < $scope.spents.length; i++) {

												//$scope.spent[i] = $scope.spents[i];
												//$scope.spent
													//	.push($scope.spents[i]);
												$scope.total += parseInt($scope.spents[i].count);
												PieData
														.push({
															value : $scope.spents[i].count,
															color : $scope.color[i],
															highlight : $scope.color[i],
															label : $scope.spents[i].name
														});
											}
											
											if ($scope.spents.length > 0) {

												pieChart.Doughnut(PieData,
														pieOptions);
											} else {
												// $("#chartmin").trigger("click");
											}
										}).error(function(data, status) {
									console.log(data);
								});

						transfers();

					}

					// create a blank object to handle form data.
					$scope.user = {};

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

					function transfers() {

						$scope.trnf = [];
						$scope.name = [];
						$scope.amt = [];
						$scope.due = [];
						var dt = new Date();
						var PieData = [];

						var month = document.getElementById("date").value;
						if (!month || month == "") {
							month = dt.getMonth() + 1 + "-" + dt.getFullYear();
						}

						// console.log(document.getElementById("personselect").value);
						$http
								.get(
										urlBase
												+ '/exptracker/spents/search/findTransfers?month='
												+ month)
								.success(
										function(data) {
											if (data._embedded != undefined) {
												$scope.trnf = data._embedded.spents;
											} else {
												$scope.trnf = [];
											}

											console.log($scope.spents);
											// console.log($scope.trnf)
											// console.log($scope.trnf.length)

											for (var i = 0; i < $scope.trnf.length; i++) {

												var flag = false;
												var num = 0;
												for (var k = 0; k < $scope.spents.length; k++) {
													if ($scope.trnf[i].name == $scope.spents[k].name) {
														flag = true;
														num = k;
													}
												}

												if (flag) {
													// console.log('in if');
													// console.log($scope.trnf[i].name);
													// console.log($scope.trnf[i].count);
													// console.log($scope.spent[num].count);
													$scope.name
															.push($scope.trnf[i].name);
													$scope.amt
															.push(parseFloat(parseFloat(
																	$scope.trnf[i].count
																			- $scope.spents[num].count)
																	.toFixed(2)));

													$scope.due
															.push("Amount Spent by "
																	+ $scope.trnf[i].name
																	+ " is "
																	+ $scope.spents[num].count
																	+ " from total due "
																	+ $scope.trnf[i].count);
												} else {
													if ($scope.trnf[i].count != 0) {
														$scope.name
																.push($scope.trnf[i].name);
														$scope.amt
																.push(parseFloat(parseFloat(
																		$scope.trnf[i].count)
																		.toFixed(
																				2)));
														$scope.due
																.push("Amount Spent by "
																		+ $scope.trnf[i].name
																		+ " is 0 from total due "
																		+ $scope.trnf[i].count);
													}
												}

												// console.log($scope.due);

											}

											var display = [];
											$scope.division = [];
											var temp = 0;
											var int_max = 0;

											// for(var j = 0;j <
											// $scope.amt.length;j++)
											// {
											// temp +=$scope.amt[j];
											// }

											// console.log($scope.name);
											// console.log($scope.amt);
											// console.log(temp);

											if ($scope.amt.length > 0) {

												var int_max = Math.max.apply(
														null, $scope.amt);// person
																			// with
																			// highest
																			// amount

												// console.log(int_max);

												while ($scope.amt.length > 0) {
													var max = Math.max.apply(
															null, $scope.amt);// person
																				// to
																				// give
													var min = Math.min.apply(
															null, $scope.amt);// person
																				// to
																				// recieve
													var maxpos = $scope.amt
															.indexOf(max)
													var minpos = $scope.amt
															.indexOf(min)
													var a = "";
													// console.log(max);
													// console.log(min);
													// console.log(maxpos);
													// console.log(minpos);

													if ((max + min) == 0) {
														a = [ {
															text : $scope.name[maxpos]
																	+ " to "
																	+ $scope.name[minpos]
																	+ " Amount $",
															amount : parseFloat(
																	max)
																	.toFixed(2),
															// perc :
															// max/int_max*100}
															perc : 100
														} ];
														$scope.division.push(a)
														$scope.name.splice(
																maxpos, 1);
														$scope.amt.splice(
																maxpos, 1);
														minpos = $scope.amt
																.indexOf(min);
														$scope.name.splice(
																minpos, 1);
														$scope.amt.splice(
																minpos, 1);
													} else if ((max + min) < 0) {
														// console.log(maxpos);
														// console.log($scope.name);
														// console.log($scope.name[maxpos]);
														a = [ {
															text : $scope.name[maxpos]
																	+ " to "
																	+ $scope.name[minpos]
																	+ " Amount $",
															amount : parseFloat(
																	max)
																	.toFixed(2),
															// perc :
															// max/int_max*100 }
															perc : 100
														} ];

														$scope.division.push(a)
														$scope.name.splice(
																maxpos, 1);
														$scope.amt[minpos] = max
																+ min;
														$scope.amt.splice(
																maxpos, 1);

													}

													else {
														// Removed - sign from
														// result condition is
														// when max is grater
														// than min

														if (min == max) {
															a = [ {
																text : "Unsetteled Amount $",
																amount : (parseFloat(max)
																		.toFixed(2)),
																// perc :
																// (min)/int_max*100
																// }
																perc : 100
															} ];

															$scope.division
																	.push(a)
															$scope.name.splice(
																	minpos, 1);
															$scope.amt.splice(
																	minpos, 1);
														} else {
															a = [ {
																text : $scope.name[maxpos]
																		+ " to "
																		+ $scope.name[minpos]
																		+ " Amount $",
																// amount :
																// (parseFloat(max).toFixed(2))
																// ,
																amount : Math
																		.abs((parseFloat(min)
																				.toFixed(2))),
																// perc :
																// (min)/int_max*100
																// }
																perc : 100
															} ];
															// console.log('in
															// else');
															$scope.division
																	.push(a)
															$scope.name.splice(
																	minpos, 1);
															$scope.amt[maxpos] = max
																	+ min;
															$scope.amt.splice(
																	minpos, 1);
														}
													}

													a = "";

													max = 0;
													min = 0;
													maxpos = 0;
													minpos = 0;

												}
											} else {

												var t = [ {
													text : "No Data for the month",
													amount : "",
													perc : 100
												} ];
												$scope.division.push(t)
											}
											// console.log( $scope.division);
										}).error(function(data, status) {
									console.log(data);
								});

					}

					findAllExpense();
					findSpent();
					// transfers();

					$("#datetimepicker").on(
							"dp.change",
							function() {

								if ($scope.datetest != document
										.getElementById("date").value) {
									// console.log(document.getElementById("date").value);
									findAllExpense();
									findSpent();
									// transfers();
									$scope.datetest = document
											.getElementById("date").value;
								}
							});

				});